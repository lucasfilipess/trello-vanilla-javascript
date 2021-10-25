let dragTracker =
{
	id: undefined,
	list: undefined
}

function buildCardNode() {
	let node = document.createElement('div')
	node.draggable = true
	node.innerHTML =
		`<div class="w-100">
			<p class="card-title w-100"></p>
			<div class="d-flex gap-2 card-badge flex-wrap w-100"></div>
		</div>`;
	return node
}

function Card(list, title, badges) {
	this.id = list.board.getNextId()
	this.list = list
	this.title = title
	this.badges = badges
	this.node = buildCardNode()
	this.titleNode = this.node.getElementsByClassName('card-title')[0]
	this.badgeNode = this.node.getElementsByClassName('card-badge')[0]

	this.node.classList.add('card')
	this.node.setAttribute('card-id', this.id)
	this.titleNode.textContent = this.title

	if (this.badges) {
		this.badges.forEach(badge => {
			const badgeTag = document.createElement('span')
			badgeTag.classList.add('badge')
			badgeTag.classList.add('bg-primary')
			badgeTag.textContent = badge
			this.badgeNode.appendChild(badgeTag)
		});
	}

	this.node.ondragstart = (function (id) {
		return function (evt) {
			dragTracker.id = id
			evt.dataTransfer.effectAllowed = 'move'
		}
	}(this.id))

	this.node.ondragover = function (evt) {
		if (dragTracker.id) {
			evt.preventDefault()
		}
	}

	this.node.ondrop = (function (board) {
		return function (evt) {
			let id = dragTracker.id
				, targetId = this.getAttribute('card-id')
				, source = board.cards[id]
				, target = board.cards[targetId]

			if (id === targetId) {
				return
			}

			source.list.cardsNode.removeChild(source.card.node)
			target.list.cardsNode.insertBefore(source.card.node, target.card.node)

			board.reregisterSubsequent(source.list, source.index + 1, -1)
			source.list.cards.splice(source.index, 1)

			board.reregisterSubsequent(target.list, target.index + 1, 1)
			target.list.cards.splice(target.index + 1, 0, source.card)

			source.card.list = target.list
			board.registerCard(source.card, target.index + 1)
			evt.preventDefault()
		}
	}(list.board))

	this.node.ondragend = function () {
		dragTracker.id = undefined
	}


	this.node.onclick = (function (card) {
		return function () {
			cardEdit.card = card
			cardEdit.titleNode.value = card.title;
			cardEdit.show()
		}
	}(this))
}