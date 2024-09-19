import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBRiAOyaP-XrXzaTu2OSqUqF39H8fNNIDI";
const genAI = new GoogleGenerativeAI(API_KEY);
let form = document.getElementById('myform');

form.onsubmit = async (ev) => {
    ev.preventDefault();
    const output = document.getElementById("hasilGenerate");

    const nama = document.getElementById('username1').value;
    const kota = document.getElementById('location1').value;
    const mood = document.getElementById('mood1').value;
    const budget = document.getElementById('budget1').value;
    const cuaca = document.getElementById('cuaca1').value;
    const transport = document.getElementById('transportasi1').value;

    output.textContent = 'Sabarr sedang mencari yang tepat...';

    // AI MODEL
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Make Prompt
    const prompt = `halo nama saya ${nama} saya ingin berliburan, tolong carikan saya tempat destinasi yang cocok untuk saya berlibur sesuai dengan kategori saya ini. kota destinasi ${kota}, saya ingin tempat destinasi sesuai dengan mood saya yaitu ${mood}, untuk budget kira-kira sekitar ${budget}, saya ingin cuaca di daerah tersebut sedang ${cuaca}. dan pilihan transportasi saya yang digunakan untuk pergi kesana yaitu ${transport}. nanti beri saya nama tempatnya dan juga beri saya alamat lengkapnya untuk destinasinya dan juga beri harga atau tarif dari tempat destinasi tersebut. jika kota yang ingin dituju tidak memenuhi maka jangan beri rekomendasikan kota lain. tambahkan icon-icon di setiap katanya, untuk mempercantik tampilan hasil.`;

    // Proses generating
    const result = await model.generateContentStream(prompt);

    let buffer = [];
    let md = markdownit();

    // Iterate over the stream and collect responses
    for await (let response of result.stream) {
        buffer.push(response.text());
        output.innerHTML = md.render(buffer.join(''));
    }
}
