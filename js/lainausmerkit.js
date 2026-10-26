/**
 * LAINAUSMERKIT PUHEAVAIMISSA (Päätoimittaja 18.10.2026; Sisältökirjurin lainausmerkkityö odottaa tätä).
 *
 * Kaarevat lainausmerkit ” “ „ → " ja ’ ‘ → ' ennen tiivistettä, jotta sama teksti suorilla ja kaarevilla
 * merkeillä saa saman puheavaimen (js/puhe.js laitteen säilö, tools/pollo/worker.js reuna ja R2,
 * js/liviapuhe.js livianTiiviste). Haku käyttää ensin normalisoitua avainta ja sitten vanhaa raakaa, joten jo
 * generoituja ”-tekstejä ei generoida uudelleen. Workerissa on sama funktio omana kopionaan (worker ei tuo js/:stä);
 * tests/lainausmerkit.test.mjs vertaa niitä.
 */
export function normalisoiLainausmerkit(teksti) {
  return String(teksti ?? '').replace(/[\u201D\u201C\u201E]/g, '"').replace(/[\u2019\u2018]/g, "'");
}
