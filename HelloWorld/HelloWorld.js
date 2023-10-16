(function()  {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
    <style>
    :host{
		border-radius: 25px;
		border-width: 4px;
		border-color: black;
		border-style: solid;
		display: block;
	} 
	</style>
	<fieldset> 
		<legend>
			<h1 style="color:red;">Title</h1>
		</legend>
		<table>
			<h2 style="text-align:center;">Header</h2>
			<h3 style="color:green;">Hello World</h3>
		</table>
	</fieldset>
    `;

	class HelloWorld extends HTMLElement {
		
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
			
			this.$h1 = shadowRoot.querySelector("h1");			
			this.$h2 = shadowRoot.querySelector("h2");
			this.$h3 = shadowRoot.querySelector('h3');
			
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			this._props = {};
		}
		
		render(title, chapter, txt) {
			this.$h1.innerHTML = title;
			this.$h2.innerHTML = chapter;
			this.$h3.innerHTML = txt;
		}	

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
        }

         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback(){
        
        }

        //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(changedProperties) {
			if ("color" in changedProperties) {
				this.style["background-color"] = changedProperties["color"];
			}
			if ("opacity" in changedProperties) {
				this.style["opacity"] = changedProperties["opacity"];
			}
			
			if ("title" in changedProperties) {
				this.$title = changedProperties["title"];
			}
			if ("chapter" in changedProperties) {
				this.$chapter = changedProperties["chapter"];
			}
			if ("txt" in changedProperties) {
				this.$txt = changedProperties["txt"];
			}
			
			this.render(this.$title, this.$chapter, this.$txt);
			
		}
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        }

        
        //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
        // Commented out by default
        /*
        onCustomWidgetResize(width, height){
        }
        */
	}
	
customElements.define('com-sap-helloworld', HelloWorld);
})();