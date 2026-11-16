# Codex → PT/KK: Hallgrímskirkja2414 mitat ja ryhmä5:n päätökset

Luin kokonaan vastaanotot2408–2412 ja päätökset2413–2416 (7629fa1531, 2e0a926e4b, 825d05c415, c29b1be960, 325439d047). Vasil2386 ja Süleymaniye2400 kirjataan KK-hyväksytyiksi. Humayun vastaanotettu, KK-päätös erikseen. Parthenonin lattia-aukon mallikorjaus otettu jonoon: alkuperäinen säilyy, korjaus erilliseen GLB:hen, yläviisto ennen|jälkeen KK:lle, muu hyväksytty muoto säilyy. Ei uusia Tripo-ottoja eikä peli-integraatiota.

## Hallgrímskirkja: kaikki kolme vastausta

1. **Korkeus:pituus:leveys = 0,601959:0,979065:0,602203 = 0,614831:1:0,615080.** Luin kaikki 1 128 140 binääristä POSITION-tietuetta; tulos ei perustu vain min/max-metatietoon. Y=korkeus, Z=pituus, X=leveys, solmussa ei skaalaa/kiertoa. Rajalaatikko min=(-0,301056;0;-0,489410), max=(0,301147;0,601959;0,489655). Normalisoidut yksiköt, ei varmennettuja metrejä.
2. **Alkuperäinen:** `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/hallgrimskirkja-tripo-2387-20261116/hallgrimskirkja-2387-max-original-8k.glb`. SHA256 `1daad6ba8d93dd7ad242940adef50b7f56bca982e34c98f18a2a625fbe2b1a3c`. Muuttumaton.
3. **Koostetta ei venytetty.** 1400×945-rajaus pienennetään kuvasuhde säilyttäen (Pillow thumbnail ja ImageOps.contain) enintään485×285-laatikkoon. Toteutunut kuva noin422×285, keskitettynä. Ei erillistä X/Y-skaalausta. Mataluus on mallissa.

Raportti: `output/hallgrimskirkja-tripo-2387-20261116/bounds-verification-2414.json`. Suhteen0,8 saavuttamiseen Y-kerroin1,30117; suhteeseen1,05 kerroin1,70779. Pystyskaalausta ei ole sovellettu. Pyydän KK:lta tavoitekertoimen/päätöksen; rajattuun tuontivertailuun ehdotus Y×1,30, X/Z ennallaan. Mittaus ei ole muokkaus- tai käyttöhyväksyntä.

Temple2403:n kevyt analyysi valmistui: lattian päätaso y≈17,52m; tarkistettava ehdokasalue x≈−4,89…−2,61, z≈−2,43…−0,11 (kolmiot22930,22931,30422). Paikalliset reunat kytkeytyvät, joten analyysi ei yksin todista avointa reikää. Seuraavaksi tarkka NUKET1-kameravarmistus. Unity-resurssiraja säilyy; mallimuutoksia ei vielä tehty.
