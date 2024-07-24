// Function to handle hash generation
function generateHash() {
    const inputText = document.getElementById('inputText').value.trim();
    const hashType = document.getElementById('hashType').value;
    const fileInput = document.getElementById('images');
    let hash;

    // Clear file input if there's text entered
    if (inputText && fileInput.files.length > 0) {
        clearFileInput();
    }

    // Clear output if no input
    if (!inputText && fileInput.files.length === 0) {
        clearOutput();
        return;
    }

    // If there's input text, generate hash for the text
    if (inputText) {
        if (hashType === 'md5') {
            hash = CryptoJS.MD5(inputText).toString();
        } else if (hashType === 'sha256') {
            hash = CryptoJS.SHA256(inputText).toString();
        }
        displayHash(hashType, hash);
    } else if (fileInput.files.length > 0) {  // If there's a file, generate hash for the file content
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const arrayBuffer = e.target.result;
            const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
            if (hashType === 'md5') {
                hash = CryptoJS.MD5(wordArray).toString();
            } else if (hashType === 'sha256') {
                hash = CryptoJS.SHA256(wordArray).toString();
            }
            displayHash(hashType, hash);
        };
        
        reader.readAsArrayBuffer(file);
    }
}

// Function to display the hash output
function displayHash(hashType, hash) {
    document.getElementById('finalOutput').innerText = `Hash (${hashType.toUpperCase()}):`;
    document.getElementById('outputContainer').innerText = hash;
    document.getElementById('finalOutput').style.display = 'block';
    document.getElementById('outputContainer').style.display = 'block';
}

// Function to clear the output
function clearOutput() {
    document.getElementById('finalOutput').style.display = 'none';
    document.getElementById('outputContainer').style.display = 'none';
    document.getElementById('textComparisonContainer').style.display = 'none';
    document.getElementById('fileComparisonContainer').style.display = 'none';
    clearTextComparisonResult();
    clearFileComparisonResult();
}

// Function to clear the text input field
function clearTextInput() {
    document.getElementById('inputText').value = '';
    clearOutput();
}

// Function to clear the text comparison result
function clearTextComparisonResult() {
    document.getElementById('compareInputText1').textContent = '';
    document.getElementById('compareTextHash1').textContent = '';
    document.getElementById('compareInputText2').textContent = '';
    document.getElementById('compareTextHash2').textContent = '';
    document.getElementById('textComparisonContainer').style.display = 'none';
}

// Function to clear the file comparison result
function clearFileComparisonResult() {
    document.getElementById('compareInputFile1').textContent = '';
    document.getElementById('compareFileHash1').textContent = '';
    document.getElementById('compareInputFile2').textContent = '';
    document.getElementById('compareFileHash2').textContent = '';
    document.getElementById('fileComparisonContainer').style.display = 'none';
}

// Function to compare hashes for text input
function compareTextHashes() {
    const inputText1 = document.getElementById('inputText1').value;
    const inputText2 = document.getElementById('inputText2').value;
    const hashType = document.getElementById('hashTypeTextComparison').value;

    if (!inputText1 || !inputText2) {
        alert("Please enter both texts to compare.");
        return;
    }

    if (!hashType) {
        alert("Please select a hash algorithm.");
        return;
    }

    const hash1 = hashType === 'md5' ? CryptoJS.MD5(inputText1).toString() : CryptoJS.SHA256(inputText1).toString();
    const hash2 = hashType === 'md5' ? CryptoJS.MD5(inputText2).toString() : CryptoJS.SHA256(inputText2).toString();

    displayTextComparisonResult(inputText1, hash1, inputText2, hash2);
}

// Function to display the comparison result for texts
function displayTextComparisonResult(inputText1, hash1, inputText2, hash2) {
    document.getElementById('compareInputText1').textContent = inputText1;
    document.getElementById('compareTextHash1').textContent = hash1;
    document.getElementById('compareInputText2').textContent = inputText2;
    document.getElementById('compareTextHash2').textContent = hash2;
    document.getElementById('textComparisonResult').style.display = 'block';
    document.getElementById('fileComparisonContainer').style.display = 'none';
    document.getElementById('compareTextButton').style.display = 'none';
    document.getElementById('compareFileButton').style.display = 'inline-block'; // Ensure compareFileButton is visible
}

// Function to compare hashes for file input
function compareFileHashes() {
    const fileInput1 = document.getElementById('inputFile1');
    const fileInput2 = document.getElementById('inputFile2');
    const hashType = document.getElementById('hashTypeFileComparison').value;

    if (fileInput1.files.length === 0 || fileInput2.files.length === 0) {
        alert("Please select both files to compare.");
        return;
    }

    if (!hashType) {
        alert("Please select a hash algorithm.");
        return;
    }

    const file1 = fileInput1.files[0];
    const file2 = fileInput2.files[0];
    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader1.onload = function(e) {
        const arrayBuffer1 = e.target.result;
        const wordArray1 = CryptoJS.lib.WordArray.create(arrayBuffer1);
        const hash1 = hashType === 'md5' ? CryptoJS.MD5(wordArray1).toString() : CryptoJS.SHA256(wordArray1).toString();
        document.getElementById('compareInputFile1').textContent = file1.name;
        document.getElementById('compareFileHash1').textContent = hash1;
    };

    reader2.onload = function(e) {
        const arrayBuffer2 = e.target.result;
        const wordArray2 = CryptoJS.lib.WordArray.create(arrayBuffer2);
        const hash2 = hashType === 'md5' ? CryptoJS.MD5(wordArray2).toString() : CryptoJS.SHA256(wordArray2).toString();
        document.getElementById('compareInputFile2').textContent = file2.name;
        document.getElementById('compareFileHash2').textContent = hash2;
        document.getElementById('fileComparisonResult').style.display = 'block';
        document.getElementById('textComparisonContainer').style.display = 'none';
        document.getElementById('compareFileButton').style.display = 'none';
        document.getElementById('compareTextButton').style.display = 'inline-block'; // Ensure compareTextButton is visible
    };

    reader1.readAsArrayBuffer(file1);
    reader2.readAsArrayBuffer(file2);
}

// Event listener for 'Enter' key press
document.getElementById('inputText').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        generateHash();
    }
});

// Event listener for hashType change
document.getElementById('hashType').addEventListener('change', function() {
    // Clear previous output
    clearOutput();

    // Generate hash for the new type
    generateHash();
});

// Event listener for file input change
document.getElementById('images').addEventListener('change', function() {
    // Clear input text if file is selected
    clearTextInput();

    // Clear previous output
    clearOutput();

    // Generate hash for the file
    generateHash();
});

// Event listener for clear file button
document.getElementById('clearFile').addEventListener('click', function() {
    clearTextInput();
    clearFileInput();
});

// Event listener for compare text button
document.getElementById('compareTextButton').addEventListener('click', function() {
    document.getElementById('textComparisonContainer').style.display = 'block';
    document.getElementById('fileComparisonContainer').style.display = 'none';
    document.getElementById('compareTextButton').style.display = 'none';
    document.getElementById('compareFileButton').style.display = 'inline-block'; // Ensure compareFileButton is visible
});

// Event listener for compare file button
document.getElementById('compareFileButton').addEventListener('click', function() {
    document.getElementById('fileComparisonContainer').style.display = 'block';
    document.getElementById('textComparisonContainer').style.display = 'none';
    document.getElementById('compareFileButton').style.display = 'none';
    document.getElementById('compareTextButton').style.display = 'inline-block'; // Ensure compareTextButton is visible
});

// Function to clear the file input field
function clearFileInput() {
    const fileInput = document.getElementById('images');
    fileInput.value = '';
    document.getElementById('clearFile').style.display = 'none';
}

// Event listener for file input change
document.getElementById('inputFile1').addEventListener('change', function() {
    document.getElementById('clearFile1').style.display = 'inline';
});
document.getElementById('inputFile2').addEventListener('change', function() {
    document.getElementById('clearFile2').style.display = 'inline';
});

// Event listener for clear file button
document.getElementById('clearFile1').addEventListener('click', function() {
    document.getElementById('inputFile1').value = '';
    document.getElementById('clearFile1').style.display = 'none';
    clearFileComparisonResult();
});
document.getElementById('clearFile2').addEventListener('click', function() {
    document.getElementById('inputFile2').value = '';
    document.getElementById('clearFile2').style.display = 'none';
    clearFileComparisonResult();
});
