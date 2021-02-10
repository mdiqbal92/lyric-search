const searchSongs = async () => {
    try{
        const searchText = document.getElementById('songInput').value;
        const url = `https://api.lyrics.ovh/suggest/${searchText}`
        const res = await fetch(url);
        const data = await res.json();
        displaySong(data.data);
        console.log(url);
    }
    catch{
        displayError('Something is Wrong try again later');
    }
    
}

const displaySong = songs => {
    const songContainer = document.getElementById('songContainer');
    songContainer.innerHTML = ``;
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'search-result col-md-8 mx-auto py-4'
        songDiv.innerHTML = `
        <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                    <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                        <audio controls>
                        <source src="${song.preview}" type="audio/mpeg">
                        Your browser does not support the audio tag.
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick = "getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
        </div>
        `;
        songContainer.appendChild(songDiv);
    });
    console.log(songs);
}
const getLyric = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1d/${artist}/${title}`
    fetch(url)
        .then(res => res.json())
        .then(data => showLyric(data.lyrics))
        .catch(displayError('Try again later'));

}

const showLyric = lyrics => {
    const lyricsDiv = document.getElementById('lyricsDiv');
    lyricsDiv.innerText = lyrics;
}

const displayError = error =>{
    const errorText = document.getElementById('errorMessage');
    errorText.innerText = error;
}