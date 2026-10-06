# Sisältökirjurin luovutus 6.10.2026 (tilinvaihto)

## Valmista
- Erä 5 (ISS-kamera, 10 eurooppalaista kohdetta, v2616) on tuotannossa (#3986).
- Elävän oppaan kuvahaku (Päätoimittajan urakka 6.10.): työkalu `tools/oppaan-kuvat.mjs` (seed, q, haku, kuvat, taulu, rakenna, tarkista, kokoa), ohje `data/oppaan-kuvat/AGENTTIOHJE.md`, muoto `data/oppaan-kuvat/MUOTO.md`. Haara `sisaltokirjuri-oppaan-kuvat-2`, PR #4083 (korvaa #4078). Tilanne: 154 / 266 paikkaa valmiina ja validoituna (Eurooppa 51 + Aasia, Lähi-itä, Afrikka, Oseania ja osa Amerikoista), 1 932 kohdetta ja 4 220 kuvaa.
- Vaiheen 2 kaupunkilista (162: pääkaupungit ja suosikit) `data/oppaan-kuvat/kaupungit-vaihe2.json`; Codexille ERÄ 1B on pushattu (posti/fable-codex-oppaan-kuvat-linssivalikko-20261006.md, haara claude/postilaatikko).
- Pelikoodari lukee `data/oppaan-kuvat/oppaan-kuvat.json` (tools/pollo/tee-opas-kuvat.mjs --sisalto).

## Jatko
Katso `data/oppaan-kuvat/JATKO.md` haarassa sisaltokirjuri-oppaan-kuvat-2: aloittamatta 105 paikkaa ryhmiteltynä, 19 paikkaa oli ajossa katkaisun hetkellä (taipei hongkong jakarta manila borneo sumatra valparaiso manaus caracas salvador portoalegre asuncion panama guatemala nuuk anchorage monterrey merida winnipeg stjohns; tiedostot voivat olla valmiita, tarkista `ls data/oppaan-kuvat/kaupungit`). Sitten vaihe 2.

## Opit
- Wikimedia antaa 429, jos yli 6–7 agenttia ajaa yhtä aikaa; `haku:` on `kuvat <Q>`-kategoriaa parempi pääväylä.
- Pakkopush on estetty: rebasen jälkeen uusi haara (-2).
- Sharp ei lue NODE_PATH:ia ESM:ssä; ajaa työkalu scratchpadista.
- Kuvat ämpäriin vain vie-paketti.sh:lla (SHA256SUMS + LAHTEET.md), ei tunnusten hakua.
