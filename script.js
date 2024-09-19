window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    var heroSection = document.getElementById('hero-section');
    var heroSectionRect = heroSection.getBoundingClientRect();
    var heroSectionBottom = heroSectionRect.bottom;

    // Mengubah warna navbar jika bagian bawah hero section kurang dari tinggi navbar
    if (heroSectionBottom < navbar.offsetHeight) {
        navbar.style.backgroundColor = '#1E1E1E'; // Warna hitam
        navbar.style.color = '#fff'; // Teks putih
    } else {
        navbar.style.backgroundColor = 'rgba(30, 30, 30, 0)'; // Warna asli
        navbar.style.color = '#ffffff56'; // Teks asli
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const dropbtn = document.querySelector('.dropbtn');
    const dropdown = document.querySelector('.dropdown');

    dropbtn.addEventListener('click', function(event) {
        event.stopPropagation(); // Hentikan event bubbling
        if (dropdown.style.transform === 'translateX(0px)') {
            dropdown.style.transform = 'translateX(200%)'; // Geser kembali
            setTimeout(() => {
                dropdown.style.display = 'none'; // Sembunyikan dropdown setelah animasi selesai
            }, 500); // Sesuaikan dengan durasi transisi
        } else {
            dropdown.style.display = 'block'; // Tampilkan dropdown
            setTimeout(() => {
                dropdown.style.transform = 'translateX(0px)'; // Geser ke posisi awal
            }, 10);
        }
    });

    // Tutup dropdown jika klik di luar dropdown
    document.addEventListener('click', function(event) {
        if (!dropdown.contains(event.target) && !dropbtn.contains(event.target)) {
            dropdown.style.transform = 'translateX(-100%)'; // Geser kembali
            setTimeout(() => {
                dropdown.style.display = 'none'; // Sembunyikan dropdown setelah animasi selesai
            }, 500); // Sesuaikan dengan durasi transisi
        }
    });
});
