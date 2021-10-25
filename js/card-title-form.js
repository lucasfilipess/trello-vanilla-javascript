function buildCardTitleForm() {
	let node = document.createElement('form')
	node.innerHTML =
		`<div>
			<textarea id="title" class="form-control mb-3 kanban-new-card-title-input" type="text"></textarea>
			<input type="text" class="form-control mb-3 kanban-new-card-badge-input" placeholder="adicione as tags separadas por espaço" >
			<button type="submit" class="btn btn-primary kanban-new-card-title-submit">Adicionar</button>
		</div>`
	node.style.display = 'none'
	return node
}

