# Aarteen paljastuksen leiskat (28.8.2026)

Omistajan kanssa iteroidut leiskat aarteen paljastusruudulle.
HTML-tiedostot ovat itsenäisiä (avaa selaimessa samasta kansiosta;
kartta-tausta.png puuttuu tarkoituksella — mikä tahansa pelin
karttakaappaus käy).

## Päätökset (omistaja 28.8.2026)

1. **Paikallisaarteet** (pieni + iso, 58 kpl Euroopassa):
   `aarreleiska-yksinkertainen.html` — EI paperiarkkia eikä kehystä.
   Kuvan oma pergamenttitausta jatkuu valokeilaksi ja vinjetoituu
   tummaan; taustalla pelin kartta tummennettuna ja purppuraan
   taitettuna (brightness 0.34, hue-rotate -24deg, purppura
   radial-overlay). Tekstit kuvan alla: nimi, arvo, FAKTA
   (paikallisaarteet.js:n fakta-kenttä = oppimisteksti "mitä tämä on
   ja mikä sen tarina on"). Livian jälkikommentti kuplassa.
2. **Aarnin luettelon diplomi** VAIN pääaarteille (7+2 kpl):
   `aarreleiska-kartta.html` / `aarreleiska-vaalea2.html` —
   kaiverruskehys (aarnin-luettelo-kehys.png, generoitu
   gpt-image-2:lla, multiply-moodissa plansin päällä), kartussissa
   otsake, alanauhassa arvo, punainen LÖYDETTY-leima päiväyksellä.
   Paikallisaarteissa kartussiteksti on "Unohdettu aarre" +
   "MAA · PIENI/ISO AARRE" — Aarnin luetteloa EI mainita (kaanoni:
   luettelossa ovat vain pääaarteet).
3. **Kuvat generoidaan vaalealle pergamentille** (malli:
   meripihka-vaalea.png): omistaja ajaa ChatGPT-putkessaan, 58
   kohdekuvausta annettu chatissa 28.8. numeroituna listana.
   Kuvat tulevat Driveen matkakirja/aarre-kansioon; nouto
   nouda-drive.yml:llä (secret SAMIREIVINEN_DRIVE_API).

## Toteutus peliin (tehty 28.8.2026)

- js/ui.js playTokenReveal + css/styles.css: kolme mallia — 'tumma'
  (entinen, laudan mustapohjaiset kuvat), 'paikallis' (vinjetointi +
  fakta + purppurakarttatausta backdrop-filterillä), 'diplomi'
  (pääaarre: kaiverruskehys assets/aarteet/aarnin-luettelo-kehys.jpg,
  kartussiotsake, alanauhan arvo, LÖYDETTY-leima päiväyksellä).
- Pohjapäätös (omistajan kortti 28.8.2026): diplomiin TUMMA → VAALEA
  siirtymä — leima lyödään tummassa valokeilassa, sitten .reveal-valo
  kirkastaa pohjan vaaleaan lopputilaan (aarreleiska-vaalea2).
- Pääaarrekuvat ovat vielä mustapohjaisia → diplomilla kuva on
  paspiskehystetty laatta; vaihtuu pergamenttiupotukseen kun vaaleat
  pääaarrekuvat (7+2) generoidaan.
- Livian jälkikommenttikupla paljastukselle on vielä tekemättä
  (sisältö puuttuu — 58 riviä kaanontekstiä, Fable kirjoittaa).
