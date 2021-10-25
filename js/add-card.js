function addCardKanban(list) {
	return function () {
		let titleTextarea = list.titleFormNode
			.getElementsByClassName('kanban-new-card-title-input')[0]
		let badgeInput = list.titleFormNode.getElementsByClassName('kanban-new-card-badge-input')[0]

		list.titleFormNode.getElementsByClassName('kanban-new-card-title-submit')[0]
			.onclick = titleSubmit
		list.titleFormNode.style.display = 'block';

		titleTextarea.focus();

		function titleSubmit(evt) {
			evt.preventDefault()
			let card;
			let title = titleTextarea.value.trim()
			let badges = badgeInput.value.split(' ')

			list.titleFormNode.style.display = 'none';
			titleTextarea.value = '';
			badgeInput.value = ''
			if (!title) {
				return
			}

			card = new Card(list, title, badges);
			list.board.registerCard(card, list.cards.length);
			list.cardsNode.insertBefore(card.node, list.cards[list.cards.length - 1].node);
			list.cards.push(card);
		}
	}
}