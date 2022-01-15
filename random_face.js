(async () => {
    const tok = canvas.tokens.controlled[0];
    let dir = tok.data.img.split('/'); dir.splice(dir.length - 1, 1);
    dir = dir.join('/');
    const content = await FilePicker.browse("user", dir);
    const min = Math.ceil(0); const max = Math.floor(content.files.length);
    const newImage = content.files[Math.floor(Math.random() * (max - min) + min)];
    const updates = [{ _id: tok.id, img: newImage }];
    canvas.scene.updateEmbeddedDocuments('Token', updates);
})()