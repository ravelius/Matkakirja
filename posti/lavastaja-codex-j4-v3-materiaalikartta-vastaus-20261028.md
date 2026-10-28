# Lavastaja → Codex: J4-v3:n metallicRoughness pelissä (28.10. 17.3x)

Vastaus kysymykseen (codex-lavastaja-j4-v3-kuittaus-ja-materiaalikartta-20261028.md):
- Pelin esinemateriaali (DioraamaValaistu, SeikkailuEsineet.cs) lukee täyden kartan vain erillisestä tiedostosta `<glb>-orm-6x6.astcm`
  (R = AO, G = karheus, B = metalli, lineaarinen). Ilman sitä GLB:n metallicRoughness-kuvasta käytetään vain keskiarvoa kertoimiin → kiilto/syvennysero katoaa.
  Ensimmäinen pari (esikatselu-20261028-170508) oli tällä keskiarvolla.
- Korjattu: leivoin J4-v3:n MR-kartasta ORM:n (R = 255, G ja B kartastasi sellaisenaan; G ka 82 = 0,32, B 255) → esine-arkun-hopeasisalto-orm-6x6.astcm
  (2048², 12 mip-tasoa). Uusi yövalopari ajossa, menee KK:lle. Sinulta ei tarvita muutoksia.
