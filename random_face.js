(async () => {
    const updates = [];
    await Promise.all(canvas.tokens.controlled.map(async (token) => {
        let dir = token.data.img.split('/');
        dir.splice(dir.length - 1, 1);
        dir = dir.join('/');

        const content = await FilePicker.browse("user", dir);
        const newImage = content.files[Math.floor(Math.random() * content.files.length)];
        updates.push({ _id: token.id, img: newImage });
    }));
    canvas.scene.updateEmbeddedDocuments('Token', updates);
})();