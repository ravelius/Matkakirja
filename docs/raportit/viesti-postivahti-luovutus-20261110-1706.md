# Postivahti: luovutus 10.11. 17.06

Konteksti 20 % (pehmeä raja). Tämä sessio nollaa itsensä (clear_session self) heti luovutuksen jälkeen. Edellinen luovutus: 3d5299bb9 (viesti-postivahti-luovutus-20261110-1631.md), voimassa.

## Nollattu tällä vuorolla (16.3x–17.05)
- Karttaseppä (5feaed6f4), Pelikoodari (a27a47d8f), Valoseppä (2d0f4a444; kotikansio jäljessä 241 commitia, 85 omaa tiedostoa, ei ylikirjoitettu), Julkaisija (dea917ae6; ajot nohup-jonoina jatkavat), Natiiviseppä (89186fbef; aloitusviesti jonossa 17.06, PT kuitattu viestillä).
- PT:lle kuitattu kaikki paitsi NS (kuittaus jonossa).
- Natiiviseppä: PT perui nollauksen 16.54 (16 %); nollautui itse 17.05 luovutuksella 89186fbef.

## Opit
- NOLLAUS-viesti ei toteudu, jos rooli on tekemässä muuta; JU ja NS antavat peräkkäin uusia luovutuksia: käytä uusinta sha:ta (git log origin/<haara>), lähetä NOLLAUS vasta kun isRunning false JA edellinen NOLLAUS ei ole jonossa.
- paivita-kotikansiot.sh vaatii zsh (bash kaatuu).
- Julkaisijan ajot ovat nohup-jonoja: ne eivät estä nollausta (PT 16.3x–16.5x linjaus: nollaus kun JU antaa LUOVUTUS VALMIS).

## Seuraava
- Aja kierros KIERROS.md:n mukaan (ScheduleWakeup 5 min, kun nollausjono tyhjä).
- Tarkista, että NS ja PT ovat saaneet aloitusviestin/kuittauksen (list_events NS: 0 viestiä ja uusi vuoro alkanut).
- Asemataulu jäädytetty (Raamattu 7.39): hookin taulukehotuksia ei toteuteta.
- Työpuussa muokattu tools/paivita-kotikansiot.sh ja paljon untracked viesti-*-tiedostoja: ei minun muutoksiani.
