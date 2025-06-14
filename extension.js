const which = require("which");
const vscode = require("vscode");

function activate(context){
    let disposable = vscode.commands.registerCommand("quickdart.run", function(){

	try {
		which.sync("dart");
	} catch (error) {
		vscode.window.showErrorMessage("Dart SDK Is Not Installed Or You Didn't Add It To Your PATH. Please Install Dart SDK For Your Operating System And Add It To Your PATH Using This Link." +
			" https://dart.dev/get-dart");
		return;
	}
	const editor = vscode.window.activeTextEditor;

	if(!editor){
     vscode.window.showErrorMessage("No Dart Is Opened.");
	 return;
	}

	const fileName = editor.document.fileName.toLowerCase();

	if(!fileName.endsWith(".dart")){
      vscode.window.showErrorMessage(fileName + " Isn't A Dart File."); 
	  return;
	}

	const terminal = vscode.window.createTerminal("QuickDart");
    terminal.show();
	terminal.sendText(`dart ${fileName}`);
  });

  context.subscriptions.push(disposable);
}

function deactivate(){}

module.exports = {
 activate,
 deactivate
};