// LONTOO-PILOTIN NÄKYMÄ (Linssiseppä 5.10.2026, vaihe 1): vain olemassa olevia pohjia (UI-POHJAT-sääntö 1.10.), ei uusia tyylejä.
//  - Avaus- ja loppuruutu: ISS-avausruudun pohja mk-astroavaus (musta, nimi, viiva, alarivi) kuten linnan nimiruutu. Musta ruutu
//    on myös Bing-ehdon siirtymä: oma pallo ja Lontoon ilmakuva eivät näy samassa kuvassa.
//  - Pysähdyksen nimi: linnan avainsanan pohja (mk-aikajana-havainne__otsikko goottilaisella + __kuvateksti antiikvalla), vasen yläkulma
//    (alareunassa ovat kertojan laatikko ja Cesiumin krediitit).
//  - Kertojan teksti: linnan kertojan laatikko mk-aikajana-kertomus (ääniä ei vielä ole, joten teksti näkyy PUHE ÄÄNENÄ -säännön mukaan).
//  - Napautus missä tahansa: pysähdyksestä seuraavaan (kuten linnan kertojan jakso).
using Matkakirja.Linssit.Kierros;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class KierrosTaulu
    {
        /// <summary>Loppuruudun kesto ennen linssin sulkua (s): mk-astroavaus--haipyy on 1,1 s.</summary>
        const float LoppuS = 1.3f;

        readonly VisualElement ruutu, nimiOtsikko, otsikko, kosketus, kertojaKehys, kertojaLaatikko;
        readonly Label ruudunNimi, ruudunAlarivi, nimi, alarivi, kertojaTeksti;
        KierrosSovitin sovitin;
        OpasSovitin opas;
        bool ruutuAuki, virheKasitelty;
        int naytettyPysahdys = -1;
        float loppuAlku = -1f;

        public KierrosTaulu(UiKerros kerros)
        {
            var yla = kerros.Juuri(LinssiUi.Ylakerros);
            // Napautusalue koko ruudulle (sulkunappi on ylemmässä kerroksessa).
            kosketus = Rakenne.El("mk-lontoo__kosketus", yla, PickingMode.Position);
            kosketus.style.position = Position.Absolute;
            kosketus.style.left = 0; kosketus.style.right = 0; kosketus.style.top = 0; kosketus.style.bottom = 0;
            kosketus.style.display = DisplayStyle.None;
            kosketus.RegisterCallback<PointerDownEvent>(_ => sovitin?.Ohita());

            otsikko = Rakenne.El("mk-astroavaus__otsikko--haipyy", yla, PickingMode.Ignore);
            otsikko.style.position = Position.Absolute;
            otsikko.style.left = 28; otsikko.style.top = 24;
            otsikko.style.right = 110;   // oikean yläkulman napit (kuvakytkin, ☰) ~100 pt (Natiivi-UI 5.10.)
            otsikko.style.alignItems = Align.FlexStart;
            otsikko.style.opacity = 0f;
            otsikko.style.transitionDuration = new StyleList<TimeValue>(new System.Collections.Generic.List<TimeValue> { new TimeValue(0.2f, TimeUnit.Second) });
            nimi = Rakenne.Teksti("", "mk-aikajana-havainne__otsikko", otsikko);
            Kirjasimet.Aseta(nimi, Kirjasin.Goottilainen);
            nimi.style.fontSize = 44; nimi.style.unityTextAlign = TextAnchor.LowerLeft;
            nimi.style.whiteSpace = WhiteSpace.Normal;
            alarivi = Rakenne.Teksti("", "mk-aikajana-havainne__kuvateksti", otsikko);
            Kirjasimet.Aseta(alarivi, Kirjasin.Antiikva);
            alarivi.style.fontSize = 19; alarivi.style.unityTextAlign = TextAnchor.UpperLeft;
            alarivi.style.whiteSpace = WhiteSpace.Normal;   // pitkä Wikipedia-kuvaus rivittyy (ei valu reunan yli)
            // Luettavuus vaalean usvan päällä (Päätoimittaja 5.10. 20.5x): sama varjo ja ääriviiva kuin keskitetyssä kertomuksessa
            // (Linssit.uss .mk-aikajana-kertomus.mk-keskella: 0 2px 14px + 0,8 px tumma ääriviiva), värit Tyylikirjasta.
            foreach (var t in new[] { nimi, alarivi })
            {
                t.style.textShadow = new TextShadow { offset = new Vector2(0, 2), blurRadius = 14, color = Tyylikirja.Himmennys.Kuva };
                t.style.unityTextOutlineWidth = 0.8f;
                t.style.unityTextOutlineColor = (Color)Tyylikirja.Himmennys.Tumma;
            }

            kertojaKehys = Rakenne.El("mk-aikajana-kertomus", yla, PickingMode.Ignore);
            kertojaKehys.style.bottom = 44;
            kertojaLaatikko = Rakenne.El("mk-aikajana-kertomus__laatikko", kertojaKehys, PickingMode.Ignore);
            kertojaTeksti = Rakenne.Teksti("", "mk-aikajana-kertomus__teksti", kertojaLaatikko);
            kertojaTeksti.pickingMode = PickingMode.Ignore;
            Kirjasimet.Aseta(kertojaTeksti, Kirjasin.Luku);
            kertojaKehys.style.display = DisplayStyle.None;

            ruutu = Rakenne.El("mk-astroavaus", yla, PickingMode.Ignore);
            ruutu.style.display = DisplayStyle.None;
            nimiOtsikko = Rakenne.El("mk-astroavaus__otsikko", ruutu, PickingMode.Ignore);
            Kirjasimet.Aseta(nimiOtsikko, Kirjasin.Kone);
            ruudunNimi = Rakenne.Teksti("", "mk-astroavaus__nimi", nimiOtsikko);
            Kirjasimet.Aseta(ruudunNimi, Kirjasin.KoneLihava);
            Rakenne.El("mk-astroavaus__viiva", nimiOtsikko, PickingMode.Ignore);
            ruudunAlarivi = Rakenne.Teksti("", "mk-astroavaus__lahde", nimiOtsikko);

            KierrosSovitin.Vaihtui += Kytke;
            OpasSovitin.Vaihtui += KytkeOpas;
            kerros.JokaRuutu += Paivita;
        }

        /// <summary>Elävä opas (5.10. 17.5x): sama näkymä — avausruutu, kohteen nimi ja teksti vain ilman ääntä.</summary>
        void KytkeOpas(OpasSovitin s)
        {
            opas = s;
            sovitin = null;
            virheKasitelty = false;
            naytettyPysahdys = -1;
            loppuAlku = -1f;
            bool auki = s != null;
            kosketus.style.display = DisplayStyle.None;
            kertojaKehys.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            kertojaLaatikko.EnableInClassList("mk-nakyy", false);
            otsikko.style.opacity = 0f;
            if (auki) { ruudunNimi.text = OpasSovitin.Otsikko; ruudunAlarivi.text = OpasSovitin.Alaotsikko; NaytaRuutu(true, heti: true); }
            else { ruutuAuki = false; ruutu.style.display = DisplayStyle.None; }
            Moderni(auki);
        }

        /// <summary>
        /// ELÄVÄ OPAS NYKYAJASSA (omistaja 5.10.2026 klo 20.4x–20.5x): nimi ja kuvausrivi modernilla kirjasimella valkoisina harmaan
        /// lasin teemasta (Tyylikirja.Harmaa), hillitty varjo säilyy; Lontoon kierros pitää goottilaisen ja antiikvan.
        /// </summary>
        void Moderni(bool paalla)
        {
            Kirjasimet.Aseta(nimi, paalla ? Kirjasin.ModerniLihava : Kirjasin.Goottilainen);
            Kirjasimet.Aseta(alarivi, paalla ? Kirjasin.Moderni : Kirjasin.Antiikva);
            nimi.style.fontSize = paalla ? 30 : 44;
            alarivi.style.fontSize = paalla ? 16 : 19;
            nimi.style.color = paalla ? (StyleColor)(Color)Tyylikirja.Harmaa.Korostus : StyleKeyword.Null;
            // Kuvausrivi samalla valkoisella kuin otsikko, kevyempi paino (Päätoimittaja 21.1x: harmaa hukkui usvaan).
            alarivi.style.color = paalla ? (StyleColor)(Color)Tyylikirja.Harmaa.Korostus : StyleKeyword.Null;
            // Avausruutu (ELÄVÄ OPAS / KERRO, MITÄ HALUAT NÄHDÄ) samalla modernilla kirjasimella.
            Kirjasimet.Aseta(ruudunNimi, paalla ? Kirjasin.ModerniLihava : Kirjasin.KoneLihava);
            Kirjasimet.Aseta(ruudunAlarivi, paalla ? Kirjasin.Moderni : Kirjasin.Kone);
        }

        OpasKohde naytettyKohde;
        float nimiAlku;
        /// <summary>Oppaan kohteen nimen näkyvyys saapumisesta (s); häivytys 0,2 s (siirtymä alle 250 ms).</summary>
        const float NimiNakyyS = 5f;

        void PaivitaOpas(OpasSovitin s)
        {
            if (s.Virhe != null)
            {
                if (virheKasitelty) return;
                virheKasitelty = true;
                UiNakymat.Hae()?.Tilarivi.Viesti(s.Virhe, 5f);
                UiNakymat.Hae()?.Linssit?.SuljeLinssi();
                return;
            }
            var l = s.Silmukka;
            if (l == null) return;
            // Avausruutu pois, kun ensimmäinen lento alkaa (laatat latautuvat lennon aikana) tai opas kysyy ensin: vaihtoehtosirut
            // eivät saa jäädä mustan ruudun alle (Natiivi-UI 5.10., koeappi dc9b6022).
            if (ruutuAuki && (l.Vaihe == OpasVaihe.Lentaa || l.OdottaaVastausta)) NaytaRuutu(false);
            bool puhuu = l.Vaihe == OpasVaihe.Puhuu || l.Vaihe == OpasVaihe.Odottaa;
            if (puhuu && l.Nykyinen != null && naytettyKohde != l.Nykyinen)
            {
                naytettyKohde = l.Nykyinen;
                nimiAlku = Time.unscaledTime;
                nimi.text = l.Nykyinen.Nimi;
                alarivi.text = l.Nykyinen.Alarivi ?? "";
            }
            // Opas kevyeksi (Päätoimittaja 5.10.): nimi ja alarivi häipyvät 5 s saapumisen jälkeen, palaavat seuraavalla pysähdyksellä.
            otsikko.style.opacity = puhuu && l.Nykyinen != null && Time.unscaledTime - nimiAlku < NimiNakyyS ? 1f : 0f;
            string teksti = s.TekstiRuudulle;
            if (teksti != null && kertojaTeksti.text != teksti) kertojaTeksti.text = teksti;
            kertojaLaatikko.EnableInClassList("mk-nakyy", teksti != null && l.VaiheAika > 0.8);
        }

        void Kytke(KierrosSovitin s)
        {
            sovitin = s;
            if (s != null) opas = null;
            virheKasitelty = false;
            naytettyPysahdys = -1;
            loppuAlku = -1f;
            bool auki = s != null;
            kosketus.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            kertojaKehys.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            kertojaLaatikko.EnableInClassList("mk-nakyy", false);
            otsikko.style.opacity = 0f;
            if (auki) { ruudunNimi.text = s.Kierros.Otsikko; ruudunAlarivi.text = s.Kierros.Alaotsikko; NaytaRuutu(true, heti: true); }
            if (auki) Moderni(false);
            else { ruutuAuki = false; ruutu.style.display = DisplayStyle.None; }
        }

        void NaytaRuutu(bool nakyy, bool heti = false)
        {
            ruutuAuki = nakyy;
            if (nakyy)
            {
                ruutu.EnableInClassList("mk-astroavaus--haipyy", !heti);
                ruutu.style.display = DisplayStyle.Flex;
                ruutu.style.opacity = heti ? 1f : 0f;
                if (!heti) ruutu.schedule.Execute(() => { if (ruutuAuki) ruutu.style.opacity = 1f; }).StartingIn(16);
            }
            else
            {
                ruutu.AddToClassList("mk-astroavaus--haipyy");
                ruutu.style.opacity = 0f;
                ruutu.schedule.Execute(() => { if (!ruutuAuki) ruutu.style.display = DisplayStyle.None; }).StartingIn(1200);
            }
        }

        void Paivita()
        {
            if (opas != null) { PaivitaOpas(opas); return; }
            var s = sovitin;
            if (s == null) return;
            if (s.Virhe != null)
            {
                if (virheKasitelty) return;
                virheKasitelty = true;
                Debug.Log("MATKAKIRJA lontoo: " + s.Virhe);
                UiNakymat.Hae()?.Tilarivi.Viesti(s.Virhe, 5f);
                UiNakymat.Hae()?.Linssit?.SuljeLinssi();
                return;
            }
            var l = s.Lento;
            if (l == null) return;

            // Avausruutu pois, kun ensimmäinen pysähdys alkaa; loppuruutu nousun jälkeen ja linssi kiinni.
            if (ruutuAuki && loppuAlku < 0 && l.Vaihe != LentoVaihe.Odotus) NaytaRuutu(false);
            if (l.Vaihe == LentoVaihe.Valmis)
            {
                if (loppuAlku < 0) { loppuAlku = Time.unscaledTime; NaytaRuutu(true); }
                else if (Time.unscaledTime - loppuAlku >= LoppuS) UiNakymat.Hae()?.Linssit?.SuljeLinssi();
                return;
            }

            bool pysahdys = l.Vaihe == LentoVaihe.Pysahdys;
            if (pysahdys && naytettyPysahdys != l.Indeksi)
            {
                naytettyPysahdys = l.Indeksi;
                nimi.text = l.Nykyinen.Nimi;
                alarivi.text = l.Nykyinen.Alarivi;
                kertojaTeksti.text = l.Nykyinen.Teksti;
            }
            otsikko.style.opacity = pysahdys ? 1f : 0f;
            kertojaLaatikko.EnableInClassList("mk-nakyy", pysahdys && l.VaiheAika > 0.8);
        }
    }
}
