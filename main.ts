import { Plugin } from "obsidian";

export default class FantasyMagicItemPlugin extends Plugin{
	statusBarTextElement: HTMLSpanElement;

	onload() {
		console.log('Fantasy Magic Item Layout loaded')
		this.statusBarTextElement = this.addStatusBarItem(),createEl('span')
		this.readActiveFileAndUpdadeLineCount();

		this.app.workspace.on('active-leaf-change', async () => {
			this.readActiveFileAndUpdadeLineCount();
		});

		this.app.workspace.on('editor-change', editor => {
			const contend = editor.getDoc().getValue();
			this.updateLineCount(contend);
		})
	}

	onunload() {
		console.log('Fantasy Magic Item Layout unloaded')	
	}

	private updateLineCount(fileContend?: string){
		const count = fileContend ? fileContend.split(/\r\n|\r|\n/).length : 0;
		const linesWord = count === 1 ? "line" : "lines";
		this.statusBarTextElement.textContent = `${count} ${linesWord}`;
	}

	private async readActiveFileAndUpdadeLineCount(){
		const file = this.app.workspace.getActiveFile()
			if (file){
				const contend = await this.app.vault.read(file)
				this.updateLineCount(contend);
			}else{
				this.updateLineCount(undefined);
			}
	}
}