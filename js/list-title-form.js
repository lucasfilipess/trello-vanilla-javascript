function buildListTitleForm() {
	let node = document.createElement('form')
	node.innerHTML =
		`<div class="m-2">
			<input id="kanban-list-title-input" class="form-control mb-3" type="text">
			<button id="kanban-list-title-submit" type="submit" class="btn btn-primary">Adicionar</button>
		</div>`
	node.style.display = 'none'
	return node
}
