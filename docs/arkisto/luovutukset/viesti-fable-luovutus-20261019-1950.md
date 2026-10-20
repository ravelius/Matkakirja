# Päätoimittajan luovutus 19.10.2026 klo 19.50 (oma nollaus, konteksti 30 %)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31. KK local_8e4fcfed-fc40-464c-854a-1d031b005332 (nollattu 19.45). Id:t /Users/Shared/Claude/osoitekirja.md.
Edellinen: viesti-fable-luovutus-20261019-1910.md (käsitelty kokonaan). Asemataulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy.

## 0. HETI ALUSSA
1. Monitorit: odottajat-vahti.py ja codex-posti-vahti.sh (30 min, uudelleen).
2. Seuraa junien 204 ja 205 TF:ää (JU). Kun kumpikin on TF:ssä: rivi KK:lle ja taululle tila "Testaajilla (…)" + TF-teksti "Uutta (pvm klo):".
3. KUORMA: 5 min -kuorma oli 160–200 klo 19.3x–19.4x ja swap 13/14 Gt. JU ajaa yhtä linjaa kevyt-lipulla, kunnes 5 min < 100. Älä käynnistä uusia raskaita ajoja ennen kuin Postivahti ilmoittaa vapautuksen.

## 1. Omistajan päätökset tässä vuorossa
- 19.18 Asemataulun junan valot kahdessa jaksossa: lastaus oranssina, lukitusta TF:ään valot syttyvät uudelleen vihreinä. TOTEUTETTU: Asemataulu v12, kenttä talo/eteneminen.jakso = "matka" (kenttä "vaihe" on teksti). Vaiheet: 1 lukittu + käännös alkoi, 2 käännös valmis, 3 testit + IPA, 4 Applelle, 5 TF:ssä. JU ja NS ohjeistettu.
- 19.20 junarivit vain "Työn alla:" ja "Valmiina:", kukin asia kerran, ei ☑/☐-listaa, ei lähtöjohdantoa, ei "Mukana lisäksi". Korjattu: junat v63–v65.
- 19.24 roolikortissa "Levossa" vain kun rooli ei odota mitään. TOTEUTETTU: scratchpad/asemataulu/hoitaja/odottaa.json = {rooli: "odottaa …"}, kierros.py näyttää sen; sääntö ASEMATAULU-ROOLI.md kohta 2 "ODOTUS EI OLE LEPO". PT pitää tiedoston ajan tasalla (poista rooli, kun se on työssä tai vapaa).
- 19.2x omistaja pyysi 204:ää "nyt". Paikallinen TF ilman Actionsia EI ole mahdollinen: ASC-avaimet ovat vain GitHub-secreteissä.

## 2. Junat
- JUNA 204: BUILD bad614bec (runko 6451b7f8d). TF iOS 39284541401: IPA ja Applelle 19.39 (4/5), sisäinen → ulkoinen automaattisesti; Mac 39285087862 jonossa. Arvio TF ~20.30. GitHub Actions oli häiriössä 18.56–19.29.
- JUNA 205: LUKITSE 205 6c67626db66d610f3d2d181b6ab4de8fa8ce353d lähetetty JU:lle 19.47 + omistajan 19.02-pyyntö sanatarkasti. Sisältö: PK:n juoksupeli v1 ad203186e + huutosoitin d9412447a, KS:n nostonimet 67fb5b478, VS:n M-rivi 6e02502d8, TKS:n +x 000ebbad6. Testit vihreät (Linssit 2137, Peli 639, Kartta 517). Muutosloki = PT:n teksti (265 mrk). TF-tavoite 22.30–23.00 (KK:lle luvattu), ilmoita heti jos lipsuu.
  Todisteet katsottu täysikokoisina: juoksu v1 iPhone + iPad (lokit/todistus-juoksu-v1-*-2026101919*), Britannia + M-rivi (todistus-juna205-britannia-iphone-20261019-1943), NUI iPad 60 fps kevyellä kuormalla (todistus-b3-vieritys-ipad3-20261019-1907, load 12).
  AUTO-nappi puuttuu palkista NS:n kuvassa tarkoituksella: näkyy vain, kun AUTO on otettu ☰:sta näkyville.
- YÖJUNA 206 (NS avaa 205:n päälle): PK a4e3b86f3 (kerättävät pallot → Codex kerattavat-v1) + tason 2 valkoiset kuutiot → aarteet-v1 #480 (PK tekee); NUI b8fdc5e4e (Montezuma) + d316b7387 (varjostinten esilämmitys); VS juoksupelin palatsivalo (k2: lattia lämpimämpi ja vaaleampi, punaisen seinän varjopuoli ylös, kuvatekstit; käännös vasta kuorman laskettua); PK lähteet-nimet 2c9c676a2; SK Sheba + riipus (sisältöpaketti JU). Laitetestaajan kierros (iPhone + iPad), TF aamulla (omistaja 19.03).
  NUI:n ehdotus hyväksytty: RETKIKUNTA (yhteinen mk-pudotus__otsikko) ja "sähköttää" (sähketeema) jäävät ennalleen.

## 3. Roolit
- Pelikoodari (nollattu 19.34): 206-paikkamerkit (yllä).
- Valoseppä: juoksuvalo k2 (yllä); rakettivideo vain yöllä vapaalla koneella.
- Äänittäjä: maisemat 4/5 (raportti bb9f2f541); Lontoon katu pois toistaiseksi, ensin juoksupelin aukot (posliini, portti, puulattia, viitta, huohotus), sitten yksi Sonniss-kierros Lontoolle.
- TKS: todistusajo.sh ym. +x 000ebbad6 (junassa 205).
- Projektiseppä: esirenderoity-video.md kahdeksi kuluksi #5003 mergetty; levossa (Olavinlinna tauolla).
- KS, Lavastaja, Linssiseppä, SK: levossa tai odottavat (odottaa.json).

## 4. PR:t
#4998 ja #5000 mergetty (worktreet poissa). Tämä luovutus omana PR:nä.

## 5. Asemataulu
Sivu v12 (jakso-valot). Junat v65: Juna 205 Työn alla = juoksupelin paikkamerkit (→ 206), Valmiina 4 riviä. eteneminen v53+ (JU päivittää 204:n). odottaa.json päivitetty 19.4x.
