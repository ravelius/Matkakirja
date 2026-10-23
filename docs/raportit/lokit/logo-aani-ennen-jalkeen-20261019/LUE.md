# Aloituslogo + siipisuhina (omistaja 19.10.2026 23.09), Natiivi-UI 23.4x

Korjaus natiivi-ui/logo-aani-206 e0f534e5a (pohja juna-206 1c7d83af8), JU:n käännös 23.33. Video: logo-aani-ennen-jalkeen.mp4
(ensin ENNEN runko-206c 930142989, sitten JÄLKEEN; ääni ja kuva samasta käynnistyksestä, iPhone-simu, uusi bundle-id kumpaankin).
Ääni = pelin oma kaappaus (Unity-mikseri) käynnistyksestä alkaen, kohdistettu seinäkellosta.

Syyt (mitattu ENNEN-videosta):
1. Siipisuhina: UiNakymat käynnistää Pulun saapumisen 1,5 s UI:n valmistumisesta → viuhahdus + siivet + tömähdys (9,8–11,5 s)
   logon ollessa vielä ruudulla. Nyt verhon tai aloitusportin aikana Pulu saapuu äänettä (Pulu.Tilanne arrival);
   Livia-avauksen oma saapumisääni valinnassa ennallaan.
2. Logon välähdys: iOS:n käynnistyspeitteen logo vaihtui Unityn verhon logoon 9,23 s kohdalla, ja verhon logo oli paksumpi ja
   kirkkaampi (logoalueen kirkkaus 37 → 42, valaistuja pikseleitä +28 %). Nyt sama natiivi logo pysyy alusta loppuun ja peite
   häivyttää sen itse pois (MatkakirjaKaynnistysPeite_Haivyta, Core Animation); verhon oma logo pysyy piilossa.
JÄLKEEN: logoalue tasan 37 koko ajan, yksi pehmeä häivytys (0,6 s), ei saapumisääntä käynnistyksessä.
Huom: simu ei piirrä verhon lopun 0,5 s häivytystä (pääsäie varattu, ruutuja ei tule) kummassakaan; peli ilmestyy simulla äkisti.
Laitteella häivytyksen todentaa laitekierros.
