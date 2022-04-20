function resetOnClick() {
	var changepoints = getChangepoints();
	for (const cp of changepoints) {
		var elem = d3.select(cp);
		elem.style("fill", "blue");
                elem.attr('class', '');
	}
	updateTable();
}

function noCPOnClick(identifier, startTime) {
	var changepoints = getChangepoints();
	var difficulty = document.querySelector('input[name="difficulty"]:checked');
	// validation
	if (changepoints.length > 0) {
		$('#NoCPYesCPModal').modal();
		return;
	}
	if (difficulty === null) {
		$('#NoDifficultyModal').modal();
		return;
	}

	var obj = {}
	obj["identifier"] = identifier;
	obj["difficulty"] = difficulty.value;
	obj["changepoints"] = null;
	obj["time_spent"] = new Date() - startTime;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "", false);
	xhr.withCredentials = true;
	xhr.setRequestHeader("Content-Type", "application/json");
	/* Flask's return to this POST must be a URL, not a template!*/
	xhr.onreadystatechange = function() {
		if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			window.location.href = xhr.responseText;
			console.log("XHR Success: " + xhr.responseText);
		} else {
			console.log("XHR Error: " + xhr.status);
		}
	}
	xhr.send(JSON.stringify(obj));
}

function submitOnClick(identifier, startTime) {
	var changepoints = getChangepoints();
	var difficulty = document.querySelector('input[name="difficulty"]:checked');
	// validation
	if (changepoints.length === 0) {
		$('#submitNoCPModal').modal();
		return;
	}
	if (difficulty === null) {
		$('#NoDifficultyModal').modal();
		return;
	}

	var obj = {};
	obj["identifier"] = identifier;
	obj["difficulty"] = difficulty.value;
	obj["changepoints"] = [];
	obj["time_spent"] = new Date() - startTime;

	var i, cp, xval, seen = [];
	for (i=0; i<changepoints.length; i++) {
		cp = changepoints[i];
		xval = cp.getAttribute("data_X");
		elem = {
			id: i,
			x: xval,
			t: cp.classList[0]
		};
		if (seen.includes(xval))
			continue;
		obj["changepoints"].push(elem);
		seen.push(xval);
	}

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "");
	xhr.withCredentials = true;
	xhr.setRequestHeader("Content-Type", "application/json");
	/* Flask's return to this POST must be a URL, not a template!*/
	xhr.onreadystatechange = function() {
		if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			window.location.href = xhr.responseText;
		}
	};
	xhr.send(JSON.stringify(obj));
}
