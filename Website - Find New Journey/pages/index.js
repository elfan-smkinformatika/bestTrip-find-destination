import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCkHxomVyzDNMVOe1HKXxOD1oQicB4b_Bo";
const genAI = new GoogleGenerativeAI(API_KEY);
let form = document.querySelector('form');

form.onsubmit = async (ev) => {
    ev.preventDefault();
    const output = document.getElementById("resultText");

    const nama = document.getElementById('username').value;
    const kota = document.getElementById('location').value;
    const mood = document.getElementById('mood').value;
    const budget = document.getElementById('budget').value;
    const cuaca = document.getElementById('cuaca').value;
    const transport = document.getElementById('transportasi').value;

    output.textContent = 'sabarr sedang mencari yang tepat ...';
    
    //AI MODEL
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    // Make Prompt
    const prompt = `halo nama saya ${nama} saya ingin berliburan, tolong carikan saya tempat destinasi yang cocok untuk saya berlibur sesuai dengan kategori saya ini. kota destinasi ${kota}, saya ingin tempat destinasi sesuai dengan mood saya yaitu ${mood}, untuk budget kira-kira sekitar ${budget}, saya ingin cuaca di daerah tersebut sedang ${cuaca}. dan pilihan transportasi saya yang digunakan untuk pergi kesana yaitu ${transport}. nanti beri saya nama tempatnya dan juga beri saya alamat lengkapnya untuk destinasinya dan juka beri harga atau tarif dari tempat destinasi tersebut. jika kota yang ingin dituju tdak memenuhi maka jangan beri rekomendasikan kota lain, jika ingin cuaca yang dingin maka rekomandasikan waktu yang tepat untuk ke tempat tersebut. tambahkan icon-con di setiap katanya, untuk mempercantik tampilan hasil.`;

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