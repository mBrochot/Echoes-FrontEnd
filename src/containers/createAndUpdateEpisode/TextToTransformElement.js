import React from "react";

const TextToTransformElement = ({
  textToTransform,
  setTextToTransform,
  wordsNumber,
}) => {
  return (
    <div className="textToTransform">
      <p>Votre texte à transformer en audio*</p>
      <div>
        Nombre de mots : {wordsNumber} {wordsNumber > 1 ? "mots" : "mot"}
      </div>
      <div></div>
      <textarea
        rows={20}
        cols={50}
        value={textToTransform}
        onChange={(event) => {
          setTextToTransform(event.target.value);
        }}
      />
    </div>
  );
};

export default TextToTransformElement;
