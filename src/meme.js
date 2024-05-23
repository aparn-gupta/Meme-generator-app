import React from "react";

function Meme() {
  let [meme, setMeme] = React.useState({
    topText: "",
    BottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  let [allmemes, setAllmemes] = React.useState([]);
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((collection) => setAllmemes(collection.data.memes));
  }, []);

  function getImage() {
    let i = Math.floor(Math.random() * allmemes.length);
    let reqdImg = allmemes[i].url;

    setMeme((prev) => ({
      ...prev,
      randomImage: reqdImg,
    }));
  }

  function handleChange(event) {
    setMeme((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  return (
    <div>
      <div className="input-boxes-container">
        <input
          className="input-box"
          type="text"
          placeholder="  Top Text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          className="input-box"
          type="text"
          placeholder="  Bottom Text"
          name="BottomText"
          value={meme.BottomText}
          onChange={handleChange}
        />
      </div>

      <div className="button-container">
        <button className="get-meme-button" onClick={getImage}>
          <h1>New Meme Template</h1>
        </button>
      </div>
      <div className="meme-image-container">
        <img className="meme-image" src={meme.randomImage} />
        <h2 className="memetext top"> {meme.topText} </h2>
        <h2 className="memetext bottom">{meme.BottomText} </h2>
      </div>
    </div>
  );
}

export default Meme;
