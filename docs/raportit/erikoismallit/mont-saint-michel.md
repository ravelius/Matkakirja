# Erikoismalli: Mont-Saint-Michel (speksi, pohja docs/raportit/erikoismalli-speksi-pohja.md)

## 0. ELÄMÄNIDEA
- Mont-Saint-Michel on kuuluisa vuorovedestä: meri nousee hiekkasärkkien yli "laukkaavan hevosen nopeudella" ja
  tekee saaresta hetkeksi saaren. Luostari kohoaa vedestä kuin laiva.
- **Perusliike:** vesi nousee ja laskee hitaasti saaren ympärillä (osa 1, kohta 6).
- **Harvinainen (noin 1/10):** kevätvuoksi, jossa nousu kestää 5 s eikä 14 s, ja vaahtoviiva kiertää saaren. Sen
  jälkeen Mikael-patsas hehkuu.
- **Reaktio:** lähestyttäessä vesi alkaa nousta, jos se oli matalalla. Napautus käynnistää kevätvuoksen.
- **Yöllä:** saaren ja luostarin lämmin valaistus, ikkunat ja muurit hehkuvat hillitysti (kuuluisa yönäkymä).

## 1. Tunniste ja paikka
- `kohde:mont-saint-michel`, avain `mont-saint-michel`. Ranska, 48,6352 N, 1,5100 W, taso 1 (kulttuuri).

## 2. Viitekuvat (Commons)
- Ilmasta: File:Mont-Saint-Michel vu du ciel.jpg (CC BY-SA 4.0, Amaustan) ja File:Mont Saint-Michel aerial.png
  (CC BY-SA 4.0, Lieven Smits).
- Etelästä: File:Mont Saint-Michel before dawn, view from the south. France.jpg (CC BY-SA 3.0, Ввласенко).
- Pohjapiirros: File:Abbaye du Mont St Michel. Plan du 1er Etage - Dessiné par Gautier et Sauvestre (PD).

## 3. Siluetti ja tunnusmerkit (tärkein ensin)
1. Kartiomainen kalliosaari, jonka huipulla on luostarikirkko. Kokonaisuus on kolmio, joka kapenee torniin.
2. Hoikka neogoottinen torni ja kullattu Mikael-patsas huipussa (korkein kohta).
3. Muurirengas saaren juurella etelä- ja itäpuolella, ja rinteen talorivit nousevat kirkkoa kohti.
4. Ympärillä vuorovesihiekka, ja etelään lähtee kapea silta (vain lyhyt tynkä).
- Pois jätetään yksittäiset talot, ikkunat, pihapuut ja kirkon lentotukipilarit (näkyvät vain ääriviivana).

## 4. Mitat ja koko
- Saari noin 320 × 260 m (kiertomatka 960 m), kallio 92 m, tornin huippu noin 157 m merenpinnasta.
- Yksikkö: 1,0 = 320 m. Pystyliioittelu 1,6, jotta torni on 60 pt:ssä selvä neula eikä nasta.
- Koko 60 pt (pidempi sivu), juuri saaren keskellä, torni hieman pohjoiseen keskeltä (kuten todellisuudessa).

## 5. Paletti ja aksentti
- Kallio ja talot: paperi ja seepia. Muurit ja kirkon katto: seepia ja musteen reuna.
- Aksentti: vesi (`--sym-luonto-vesi` #4a7690 35 %) ja pieni kultahehku Mikael-patsaassa (`--sym-ihme` #b8862b
  35 %).

## 6. Animaatio
- **Vuorovesi (osa 1):** matala vesilevy saaren ympärillä nousee ja laskee (pystysiirto −0,02 → +0,03 yksikköä,
  reunan peitto hiekan päällä kasvaa). Nousu 14 s, korkealla 20–40 s, lasku 14 s ja matalalla 30–90 s, kaikki
  smootherstepillä. Vaihtelu: KayMinS 60, KayMaxS 150, SeisooMinS 30, SeisooMaxS 90, TaukoTod 0,5, Puuska 0.
- **Valo (osa 2):** Mikael-patsas hehkuu pehmeästi, 1,5 s:n nousu ja lasku, kerran vesivuoron huipulla. Ei välähdystä.
- Enintään 3 liikkeellä (Liikekoordinaattori). Levossa, kun vesi on paikallaan, piirretään 0 kehystä.

## 7. Kolmiot ja LOD
- Runko: kallio (Rengaskallio, 3 kerrosta × 10 sivua) 180, muurit 160, rinteen talorivit 12 laatikkoa 144, kirkko
  (laiva, kuori ja harja) 120, torni ja patsas 60, silta 24. Yhteensä noin 690.
- Vesilevy 64 (rengas 32 sivua). LOD0 noin 760, LOD1 noin 300 (talot pois, kallio 6 sivua).

## 8. Ääriviiva ja perspektiivi
- Reuna koko mallille ja vesilevyn ulkoreunalle, mutta ei vesilevyn sisäreunalle (se sulautuu kallioon).
  Perspektiivi juureen.

## 9. Hyväksyminen
- Kuvat: ylhäältä keskellä, 30°:n kallistus lounaasta (torni ja rinne näkyvät) ja reunalla. Video 10 s vuoron
  noususta. ≤ 0,3 ms.
