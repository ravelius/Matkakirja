# Pelikoodari: luovutus 29.10.2026 klo 09.39

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN). Edellinen luovutus -20261029-0858 (+ lisäys 09.05).
Lokien kameratiivistys: `python3 -I /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/parkour-20261027/kamerarivit.py <konsoli-stdout.log>`.
Tarkista jokaisesta ajosta ensin rivi "ladattu N glb:tä, puuttuu 0".

## Valmista
- DRONE h 2916b2df4 (pelikoodari/drone-214): ennakkonäytteet kujassa ennakkokohdan omaan leveyteen (g: sivunäyte osui 3,3 m:n muureihin
  → tarve 4,8 m). Ajot h/h2 (lokit/todistus-drone214h2-2916b2df4-20261029-0914): alku t 11 → 2,3–2,8 m tasaisesti (g: 2,3–5,0 m).
  Jäljellä yksi 4,3 m siirtymässä t 9,5 avauksesta kujaan.
- DRONE i 1616d13e7: räystäsennakko ehdokaskujan lopun yli suoraan 16 m (JuoksuV4Saanto.PisteetEdessa yliM, DroneNosto.RaystasYliM;
  testi EnnakkoRisteyksenYli). Ajo (…drone214i-1616d13e7-20261029-0928): 2. portti t 87–94 nousee tasaisesti 2,4 m/s.
  1. portti t-portti-120 U-käännöksen jälkeen: Puyi juoksee etelään, kääntyy 6 m länteen ja sitten pohjoiseen 7,3 m/s:lla, joten portti
  näkyy vasta 4,3 s ennen (29 m). 2,5 m/s:lla ehtii vain noin 10 m, ja nousu oli yhä 8,6 → 13,8 m sekunnissa.
- DRONE j d7c7e5402 (JU:lla ajossa): DroneNosto.EhtivaNopeus. Myöhään nähty räystäs tasaisesti enintään VaatiiNopeusMax 4 m/s
  (tavoite suoraan tarve). Testi PehmeaDrone… (4,3 s, 13,8 m). Peli 763/763, unity 0.
  Skriptit: proto-3d/_tyo/pelikoodari/parkour-20261027/kaanna|aja-drone214j-d7c7e5402.zsh (125 s).
- PARI pk7v65 20c32559f (pelikoodari/pk7-214 = tausta-v65). 1. ajo (…-0909) mitätön: PT poisti v64-viennin → 22 × 404.
  juuri-pk7-v65 = symlinkit, rakennukset-v49, avoimet-v51 ja muurikate-v20 nyt v65-paketista. Uusinta (…-0919, 283/283) on puhdas,
  mikään ei peitä pelaajaa. Välke pieneni, mutta laikku näkyy video-s 25,5–26,75. LR löysi syyn: kujapalan kk-tausta-kuja-0-3
  kujakivi jatkui portin ohi, ja korjaus yksikerros-v105 tulee pakettiin v66. Kuvat:
  proto-3d/_tyo/pelikoodari/kuja05-pk6-20261029/pari-v65-kuvat/.
- RIKOTUT pelikoodari/rikotut-214 1414ce73e: KK:n 4 historiakorjausta (SK:n tiedosto, omistaja 08.55) ja B-muistokuvat
  esineet/cloisonne.jpg ja kaaretaulu.jpg (Codex 459f75c54 B/, SHA OK) = 8d8611882. Lisäksi lautaspöydän latauspolku
  aarteet/ → aarteet799-v4/ (404 kaikissa ajoissa, JU:n selvitys). Codexin A-kuvat ovat NUI:n haarassa e89d32ffa, älä lisää.
  Codexin toimitus 459f75c54 on siis käsitelty. NUI:lle on kerrottu 1414ce73e.
- Levy: JU poisti vanhat appit (kaapu-f912dd6ad, drone-5e926cd11, pk7v64-cd7cbbdcb).

## Odottaa
- JU: drone j. Tarkista t-portti-120 (t ≈ 70–76): nousu enintään 4 m/s ilman hyppyä, ja 2. portti yhä 2,4 m/s. Sitten Sonnet
  tarkistaa videon → PT → KK → juna 214 omana eränä (vain kamera). Kerro PT:lle, että KK:n 2,5 m/s ei täyty U-käännöksen portilla.
- LR: v66 (tausta yksikerros-v105 ja 05-portti rakennukset-v119). Linkitä juuri-pk7-v66 (kopioi juuri-pk7-v65 -RP, lisää tausta-v66
  ja rakennukset-v119), vaihda TaustaKansio/RakennusKansio pk7-214:ään ja tee uusi pari. Nippu junaan vasta puhtaan parin jälkeen
  (PT → KK → JU, joka vie cd7…/20c… seuraajan NS:lle).
- KK: omistajan 08.55 nimilista (14 kpl, id = nimi) tekstit.fi.json:n .nimi-avaimiin rikotut-214:ään. Listaa ei ole lokissa eikä
  NUI:lla. Nyt esim. sinivalkoinen-maljakko = "Sinikukkainen maljakko", cloisonne = "Cloisonné-vati", kello = "Hovin kello".
  Sen jälkeen SHA NUI:lle.

## Jatko keskeytyksestä
- Taustaajoja ei ole. Worktreet puhtaat: wt/proto-pelikoodari-kaapu-213 (drone-214 d7c7e5402), wt/proto-pelikoodari-rikotut-214
  (1414ce73e), wt/proto-pelikoodari-pk7-214 (20c32559f).
- SendMessage-raja täynnä → viestit varakanavalla mcp__ccd_session_mgmt__send_message.
