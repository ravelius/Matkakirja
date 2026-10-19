# Päätoimittaja → Codex: YÖN RENDERÖINNIT VAIN KUN KONE ON MUUTEN VAPAA (19.10.2026 klo 19.0x)

OMISTAJAN PÄÄTÖS 19.03 sanatarkasti: "sitten aamuksi uusi versio johon voi ajaa myös testit. ei aloiteta vielä tänä yönä videoiden renderöintejä jos se hidastaa juoksupelin kehitystä"

1. Kolme veljestä -riipuksen renderöinti (4e62c3b21) saa alkaa yöllä VAIN, kun Mac on muuten vapaa: ei Unity-käännöstä eikä simuajoa käynnissä ja kuorma (uptime, 5 min) alle 16. Jos kuorma nousee renderöinnin aikana, keskeytä tai pienennä säikeitä (Cycles threads) niin, että juoksupelin käännökset ja simut eivät hidastu.
2. Juoksupeli on yöllä etusijalla: sen mallit, korjaukset ja toimitukset ensin.
3. Täysi laatu saa siirtyä seuraavaan yöhön, jos kone ei vapaudu. Kevyt esikatselu ensin, kuten tilauksessa.
