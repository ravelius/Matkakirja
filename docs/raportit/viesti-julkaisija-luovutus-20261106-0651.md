# Julkaisija: luovutus 6.11.2026 klo 06.51

Rooli: Julkaisija (JU). Korvaa -0041:n ALOITA-osan. Voimassa: -0041:n ja -2347:n VIRHEET JA OPIT, -2152:n TAPA, JUNA 219 ja OPIT (haara julkaisija-luovutus-2152), -1906:n TAPA ja -1812:n SITOVAT LINJAT. T = /Users/Shared/Claude/julkaisija-tyokalut, jonoloki T/jono-20261103-ilta.txt.

Syy: konteksti 25 % (pehmeä raja, Raamattu 7.37).

## ALOITA TÄSTÄ
1. Tilanne 06.51: L1 ja L2 vapaat, jono tyhjä, JU:n taustaajoja ei kesken. Ajossa ollut yhteinen f48f56b0e valmistui 06.50.
2. Käynnistä lukkovahti Monitorina (zsh T/lukkovahti.zsh, 30 min, uudelleen päättyessä).
3. Odottaa sinua: VS katsoo kuvat lokit/valoseppa-maa4-f48f56b0e ja vie ne KK:lle. PT:n vastuuhenkilö on VS. JU:lta ei odoteta muuta.
4. PT:n linjat aamulla: yövaltuus päättyi 06.43, "KK hyväksyi" vain KK:n omalla rivillä. Hiljainen tunti 12.13, jos omistaja on koneella. Joutilaisuus: ioreg -c IOHIDSystem, HIDIdleTime (ns); 06.45 oli noin 10 h.
5. Yhteinen Pariisin ajo: seuraavan kärki tulee pohjaksi f48f56b0e:n päälle, ellei PT muuta sano. f48f56b0e = paikallinen julkaisija/ajo-pariisi-maa4 = 4c63d8662 (KS 4f6c9286a + NUI 9e2d0edba + NS 132a15b7d) + VS 0ac043480. Sisältää e726bba9f:n. Ei viedä, ei junaan.

## AJETTU 00.42–06.50 (jonolokissa kesto ja kuvat)
LAV aja-a1 (2), aukot2 (5), aukot3 (5), ajoi itse. VS 8143b96ef (8, ajoi itse), 0c25527b2 (6), 0d317ab6f (9). KS 0e054ad1b (5), 65a42c1a8 (6), 5e00d521e (5). NS 14486a929 (2), 16dc02e73 (5, peruttu mutta ehti ajaa), 64820ec1a (7). Yhteiset 4c63d8662 (8) ja f48f56b0e (8). Kaikissa exit 0, 0 PUUTE, 0 Shader error, 0 error CS. Kuvia en katsonut; tekijät katsovat.
Palautetut: LAV aukot2 7 kuvaa, VS sk-palais 14 kuvaa, KS sk-pariisi-sc 8 kuvaa; kaikki palasivat täytettyinä.

## VIRHEET JA OPIT
- VIRHE: päästin VS:n 0d317ab6f:n (9 kuvaa) rivin "KK hyväksyi" varassa, jota en varmistanut. KK oli sanonut "ei omaa ajoa". VS oikaisi itse, PT hyväksyi jälkikäteen. Kun lupa on perustelu ylimääräisille kuville, tarkista lupa sen antajalta tai kirjaa "ilmoittama", ja mieti, onko "seuraavassa ajossa" eri asia kuin oma ajo.
- Luvan aikaleimat voivat olla kelloa edellä: "PT 01.5x" klo 01.40, "PT 02.0x" klo 01.49. Roolien arvioima aika, ei date. Älä nojaa niihin järjestyksessä.
- Yhteisen ajon ristiriita: PT:n sana on "älä ratko itse". Pyydä tekijältä yhdistetty sha (KS teki 1 min:ssa), älä sovella viestissä annettua ratkaisua. Puhtaan yhdistyksen teen itse plumbingilla, ei työpuuta koskien: git merge-tree --write-tree A B, git commit-tree T -p A -p B, git branch -f (ettei jää roskaksi).
- Koeyhdistys kolmen kärjen kanssa: merge-tree kahdella ensin, commit-tree välikommitiksi, sitten kolmas. Vahvistaa tekijän kuivakokeen.
- Sisarcommit: 132a15b7d on 64820ec1a:n poiminta eri pohjalta, sisältö sama (PT). Sama otsikko ei tarkoita samaa pohjaa.
- Paikalliset sha:t löytyvät proto-reposta (/Users/Shared/Claude/proto-3d/Matkakirja-proto/.git), ei tästä työpuusta: tarkista git -C /Users/Shared/Claude/wt/julkaisija-ns-gc cat-file -t SHA. Tämä työpuu on Matkakirja-fablen repossa.
- Peruutus ja uusi pyyntö menevät ristiin: NS:n "aja tämän tilalla, ellei edellinen ole jo käynnissä" tuli, kun edellinen oli jo ajettu. Sen oma ehto pysäytti; PT:n "yksi ajo" oli silloin käytetty, joten kysyin NS:ltä sanan.
- Skenaarion kuvamäärä: grep -c '^kuva ' tiedostosta, ei viestin luvusta (VS 14 → 13, KS 9 → 8).
- Lukkovahti ajaa 30 min kerrallaan, ja hiljaisina tunteina uudelleenkäynnistys on ainoa vuoro; 02.57–06.45 ei tapahtunut mitään.
- JU:n ajama mac-ajo.zsh kirjaa AJO-rivin itse; LAV:n ja VS:n itse ajamat kirjataan käsin LUKKO VAPAA -viestistä.
