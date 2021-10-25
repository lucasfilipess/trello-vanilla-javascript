let cardEdit =
{
	node: document.getElementById('card-edit')
	, windowOverlay: document.getElementById('container-main')
	, titleNode: document.getElementById('card-edit-title')
	, card: undefined
}

cardEdit.clearInputs = () => {
	cardEdit.titleNode.value = '';
}

cardEdit.close = function () {
	cardEdit.card = undefined
	cardEdit.clearInputs()
	cardEdit.node.style.display = 'none'
	cardEdit.windowOverlay.style.display = 'none'
}

cardEdit.show = function () {
	cardEdit.windowOverlay.style.display = 'block'
	cardEdit.node.style.display = 'block'
}

cardEdit.submit = function (evt) {
	evt.preventDefault()
	let title = cardEdit.titleNode.value.trim();

	if (title) {
		cardEdit.card.title = title
		cardEdit.card.titleNode.replaceChild(document.createTextNode(title),
			cardEdit.card.titleNode.childNodes[0])
	}
	cardEdit.close()
}