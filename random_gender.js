(async () => {
    const tok = canvas.tokens.controlled[0];
    let raceDir = tok.data.img.split('/');
    raceDir.splice(raceDir.length - 2, 2);
    const raceContent = await FilePicker.browse("user", raceDir.join('/'));
    const genderDir = raceContent.dirs[Math.floor(Math.random()*raceContent.dirs.length)];

    const content = await FilePicker.browse("user", genderDir);
    const min = Math.ceil(0); const max = Math.floor(content.files.length);
    const newImage = content.files[Math.floor(Math.random() * (max - min) + min)];
    const updates = [{ _id: tok.id, img: newImage }];
    canvas.scene.updateEmbeddedDocuments('Token', updates);
})()