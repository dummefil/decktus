
//todo theme mode, colors gaps, borders,
// todo 8 tiles per page/ or from user settings

export function SettingsData ()  {
    const column = 6;
    const row = 3;
    return {
        column,
        row,
        tilesCount: column * row,
    }
}
