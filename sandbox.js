async function executeSolutionWithPiston(language, version, code, input) {
  try {
    // Kirim permintaan POST ke Piston menggunakan fetch
    const response = await fetch(
      "http://piston.geraldsimanullang.site:2000/api/v2/execute", // Ganti dengan URL Piston yang sudah Anda host
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: language,
          version: version,
          files: [{ name: "solution.js", content: code }],
          stdin: input, // Input diberikan di sini
        }),
      }
    );

    // Parse JSON response dari Piston
    const data = await response.json();

    console.log("INI DATA:", data);

    // Mengembalikan output dari Piston
    // return data.run.stdout.trim(); // Menghilangkan whitespace berlebih
  } catch (error) {
    console.error("Error executing solution with Piston:", error);
    return null;
  }
}

async function testSolutionAgainstTestCases(
  language,
  version,
  code,
  testCases
) {
  for (const testCase of testCases) {
    const { input, expectedOutput } = testCase;

    // Eksekusi solusi pengguna di Piston dengan input dari test case
    const output = await executeSolutionWithPiston(
      language,
      version,
      code,
      input
    );

    // Bandingkan output dari Piston dengan expectedOutput
    if (output === expectedOutput) {
      console.log(`Test case passed with input: "${input}"`);
    } else {
      console.log(`Test case failed with input: "${input}"`);
      console.log(`Expected: "${expectedOutput}", but got: "${output}"`);
    }
  }
}

const userCode = `
function findLargestNumber(numbers) {
  return Math.max(...numbers);
}

function main() {
  const input = require('fs').readFileSync(0, 'utf8').trim();
  const numbers = input.split(' ').map(Number); // Pisahkan input menjadi array angka
  console.log(findLargestNumber(numbers)); // Cetak hasil terbesar
}

main();
`;

const testCases = [
  {
    input: "5 3 8 6 2",
    expectedOutput: "8",
  },
  {
    input: "1 1 1 1",
    expectedOutput: "1",
  },
  {
    input: "10 20 30",
    expectedOutput: "30",
  },
];

testSolutionAgainstTestCases("javascript", "20.11.1", userCode, testCases);
