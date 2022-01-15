(async () => {
    const updates = [];
    await Promise.all(canvas.tokens.controlled.map(async (token) => {
        let raceDir = token.data.img.split('/');
        raceDir.splice(raceDir.length - 2, 2);
        const raceContent = await FilePicker.browse("user", raceDir.join('/'));
        const genderDir = raceContent.dirs[Math.floor(Math.random() * raceContent.dirs.length)];

        const content = await FilePicker.browse("user", genderDir);
        const newImage = content.files[Math.floor(Math.random() * content.files.length)];
        updates.push({ _id: token.id, img: newImage });
    }));
    canvas.scene.updateEmbeddedDocuments('Token', updates);
})();