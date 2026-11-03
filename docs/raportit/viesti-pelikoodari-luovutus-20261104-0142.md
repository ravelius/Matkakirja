# Pelikoodari: luovutus 4.11.2026 klo 01.42 – vuotokorjaus, v9b ja v9c JU:lla

Edellinen: -20261104-0125 (5e659973b), voimassa ellei alla toisin (kohdat 1–3 korvattu). Syy: kova raja 35 % (7.37). Ei omia taustaketjuja. Kuvat PT:lle, PT vie KK:lle. Tulokset: lokit/pk-muistipiikki-219/TULOS.md.

## Muisti: uudestaan-vuoto (PT 01.32 ja 01.4x)
- Todistettu ajolla: 9f8d2d13f + 12 x `uudestaan` = VIKA 4081 Mt; verkot +556 kpl, +41 Mt/kerta, tekstuurit tasan. Pelaajan Uudestaan on sama metodi (koodi).
- **Korjaus 2cce14eb2** (pelikoodari/muistipiikki-219, wt/proto-pelikoodari-muisti; 9f8d2d13f:n päällä): juoksunOmat puretaan PuraEsteet-kutsussa, vanhan juoksun latauskorutiinit päättyvät (omaJuoksu). Unity 0 virhettä, 794/794; LAITTEELLA AJAMATTA, vuodon loppumista ei ole todistettu.
- **JU:lla:** `_tyo/pelikoodari/muistipiikki-219/mittaa-uudestaan.zsh 2cce14eb2 1`, sitten mittaa-sali.zsh 2cce14eb2 1 ja 2, jos ei VIKAa. Läpäisy (PT): muisti TASAANTUU alle rajan 40 ajon aikana. Analyysi kierroksittain: fp, gfx, malloc ja T-rivien "verkot N kpl" (ks. TULOS.md "Pitkä uudestaan-ajo"). Mahdolliset jäännökset: hallittu keko, glb:n uudelleenluku.
- Sitten Release (PT: ratkaisee julkaisun), vasta sen jälkeen juna. Lataus +6 s KK hyväksynyt hinnaksi. Vanhaa 4397cf20d:tä ei ajeta.
- **LOPUKSI RIVI PT:lle (pyydetty):** koodin mukaan sama vuoto julkaistussa TF 217:ssä 60bd5c356 (ei mitattu, TULOS.md).
- Salimittaukset 9f8d2d13f: 3854 ja 3812 Mt; PT kirjasi alle rajan. Sali vain 3 s/kierros.

## Kamera seinässä/katossa (PT 01.32, AUKI)
5/12 kuvassa heti `uudestaan`-komennon jälkeen (sali-9f8d2d13f-*). Koodi (päätelty): koskee todennäköisesti myös pelaajaa; nollaamattomat kamera-arvot M:2172, kujaW, aukioW, saliW, teleW, viimeSaliRyhma; M:997 ja M:2065 nollaavat vain osan. Pitää mitata: selvitä, näkyykö vika pelaajan reitillä; tulos PT:lle. Ei korjattu.

## Palvelijat
- **v9** e53ff7ce8 katsottu: kannettu maljakko sinivalkoinen ja hyvä (lahikuva-maljakko-malja2-005.jpg, palvelijat-v9/). Sirpaleet olivat kasassa ja peittivät toisensa. PT:lle ei vielä lähetetty.
- **v9c** 691988976 / kuvarunko 18d2a3487: pienemmät palat, kierre levälleen. JU-jonossa `palvelijat-v9/aja-v9c.zsh 2`; tulokset palvelijat-v9/v9c/.
- **v9b** d598679e1: lätäkkö vedenkantajalta 17–24 m:stä, JU ajaa; kuvat palvelijat-v9/vesi-*. v8b ei näyttänyt lätäkköä (osui 5,7 m:ssä; ui-komento noin kerran sekunnissa).
- **Sitten PT:lle yhdellä viestillä:** v9c:n maljakko + sirpaleet + lätäkkö. Mainitse: sirpaleiden muodot koodista, koska Codexin palat samanlaiset (3D kuuluu Codexille). KK:n 01.06 ei ole hyväksyntä.
- Tarkista: Cull Back -pinnat, jalka ja ämpäri, varjostinvirheet. malja2-120:ssa kaukana seinällä ruudukkokuvio: ei tutkittu.

## Muut
Otsikko 6aed10e25 (-0015 kohta 1; B5 kohta 2), palvelijatar v2 (-0015 kohta 5), Vesi-219 (-0015 kohta 6). Ennen junaa: liikevahti Palvelijat.cs 3 > 0, pohjavahti JuoksuAvausJuliste.cs; tarkista.sh muuttaa tyylikirjatiedostot, palauta ne.
