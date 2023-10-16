(function() {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Insert</legend>
				<table>
					<tr>
						<td>Title</td>
						<td><input id="aps_title" type="string"></td>
					</tr>
					<tr>
						<td>Chapter</td>
						<td><input id="aps_chap" type="string"></td>
					</tr>
					<tr>
						<td>Text</td>
						<td><input id="aps_text" type="string"></td>
					</tr>
				</table>
				<input type="submit" style="display:none;">
			</fieldset>
		</form>
	`;

	class HelloWorldBuilder extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							title: this.title,
							chapter: this.chapter,
							txt: this.txt
						}
					}
			}));
		}
		
		set title(newTitle) {
			this._shadowRoot.getElementById("aps_title").value = newTitle;
		}
		
		get title() {
			return this._shadowRoot.getElementById("aps_title").value;
		}

		set chapter(newChap) {
			this._shadowRoot.getElementById("aps_chap").value = newChap;
		}
		
		get chapter() {
			return this._shadowRoot.getElementById("aps_chap").value;
		}
		
		set txt(newText) {
			this._shadowRoot.getElementById("aps_text").value = newText;
		}
		
		get txt() {
			return this._shadowRoot.getElementById("aps_text").value;
		}
		
	}

customElements.define("com-sap-helloworld-builder", HelloWorldBuilder);
})();