const presets = [
    [0.0,0.0,9.5,0.0,7.5,9.5], // front
    [8.9,-0.5,-2.6,0.0,7.5,9.5], // side
    [3.75,-0.4,5.0,0.0,7.5,9.5], // 3/4
];

document.getElementById("presets").addEventListener("click", handlePresetClick, false);

function handlePresetClick (event) {
    if (event.target.className == "preset") {
        let p = presets[event.target.getAttribute("data-preset")];
        controls.reset();
        camera.position.set(
            p[PresetData.cameraX],
            p[PresetData.cameraY],
            p[PresetData.cameraZ]);
        lamp.position.set(
            p[PresetData.lightX],
            p[PresetData.lightY],
            p[PresetData.lightZ]);
    }
}