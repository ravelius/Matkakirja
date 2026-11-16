# Mac-päivittäjä (omistaja 16.11.2026 klo 17.07, KK:n tehtävä, PT; JU teki)

`Päivitä Matkakirja.command` ladataan asennussivulta kerran (Paivita-Matkakirja.zip, linkki "Päivitä Matkakirja (Mac)"
napin "Asenna Maciin" alla). Kaksoisnapautus: lukee Matkakirja-mac.versio → jos sama kuin asennetun appin CFBundleVersion,
"ajan tasalla" ja peli auki; muuten lataa Matkakirja-mac.dmg väliaikaiskansioon (ei Latauksiin), liittää, tarkistaa
allekirjoituksen, sulkee käynnissä olevan Matkakirjan, korvaa /Applications/Matkakirja.app, irrottaa levykuvan,
poistaa latauksen, siirtää vanhat käsin ladatut Matkakirja-mac*.dmg Latauksista roskakoriin ja avaa pelin.
Ei salasanaa (jos vanha app ei ole kirjoitettava, pyytää vetämään sen roskakoriin kerran). Loki ~/Library/Logs/Matkakirja-paivitys.log.

Julkaisu: `ditto -c -k --norsrc "Päivitä Matkakirja.command" proto-3d/jako/Paivita-Matkakirja.zip` (zip säilyttää suoritusoikeuden).
Testi: MATKAKIRJA_KOHDE / _LATAUKSET / _ROSKA / _LOKI ohjaavat kansiot testikansioon.
