// https://stackoverflow.com/questions/56300132/how-to-override-css-prefers-color-scheme-setting
// Return the system level color scheme, but if something's in local storage, return that
// Unless the system scheme matches the the stored scheme, in which case... remove from local storage
function getPreferredColorScheme(){
	let systemScheme = 'light';
	if(window.matchMedia('(prefers-color-scheme: dark)').matches){
		systemScheme = 'dark';
	}
	let chosenScheme = systemScheme;

	if(localStorage.getItem("dark-mode-toggle")){
		chosenScheme = localStorage.getItem("dark-mode-toggle");
	}

	if(systemScheme === chosenScheme){
		localStorage.removeItem("dark-mode-toggle");
	}

	return chosenScheme;
}

// Write chosen color scheme to local storage
// Unless the system scheme matches the the stored scheme, in which case... remove from local storage
function savePreferredColorScheme(scheme){
	let systemScheme = 'light';

	if(window.matchMedia('(prefers-color-scheme: dark)').matches){
		systemScheme = 'dark';
	}

	if(systemScheme === scheme){
		localStorage.removeItem("dark-mode-toggle");
	}
	else {
		localStorage.setItem("dark-mode-toggle", scheme);
	}

}

// Get the current scheme, and apply the opposite
function toggleColorScheme(){
	let newScheme = "light";
	let scheme = getPreferredColorScheme();
	if (scheme === "light"){
		newScheme = "dark";
	}

	applyPreferredColorScheme(newScheme);
	savePreferredColorScheme(newScheme);
}

// Apply the chosen color scheme by traversing stylesheet rules, and applying a medium.
function applyPreferredColorScheme(scheme) {
		for (var s = 0; s < document.styleSheets.length; s++) {
			for (var i = 0; i < document.styleSheets[s].cssRules.length; i++) {
				let rule = document.styleSheets[s].cssRules[i];

				if (rule && rule.media && rule.media.mediaText.includes("prefers-color-scheme")) {

					switch (scheme) {
							case "light":
									rule.media.appendMedium("original-prefers-color-scheme");
									if (rule.media.mediaText.includes("light")) rule.media.deleteMedium("(prefers-color-scheme: light)");
									if (rule.media.mediaText.includes("dark")) rule.media.deleteMedium("(prefers-color-scheme: dark)");
									console.log('light time');
									break;
							case "dark":
									rule.media.appendMedium("(prefers-color-scheme: light)");
									rule.media.appendMedium("(prefers-color-scheme: dark)");
									if (rule.media.mediaText.includes("original")) rule.media.deleteMedium("original-prefers-color-scheme");
									console.log('dark time');
									break;
							default:
									rule.media.appendMedium("(prefers-color-scheme: dark)");
									if (rule.media.mediaText.includes("light")) rule.media.deleteMedium("(prefers-color-scheme: light)");
									if (rule.media.mediaText.includes("original")) rule.media.deleteMedium("original-prefers-color-scheme");
									console.log('default time')
									break;
					}
				}
			}
		}
}

applyPreferredColorScheme(getPreferredColorScheme());

// From https://www.npmjs.com/package/dark-mode-toggle sample code
document.querySelector('dark-mode-toggle').addEventListener('colorschemechange', () => {
	applyPreferredColorScheme(getPreferredColorScheme());
});