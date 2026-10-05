// LONTOO-PILOTIN NÄKYMÄ (Linssiseppä 5.10.2026, vaihe 1): vain olemassa olevia pohjia (UI-POHJAT-sääntö 1.10.), ei uusia tyylejä.
//  - Avaus- ja loppuruutu: ISS-avausruudun pohja mk-astroavaus (musta, nimi, viiva, alarivi) kuten linnan nimiruutu. Musta ruutu
//    on myös Bing-ehdon siirtymä: oma pallo ja Lontoon ilmakuva eivät näy samassa kuvassa.
//  - Pysähdyksen nimi: linnan avainsanan pohja (mk-aikajana-havainne__otsikko goottilaisella + __kuvateksti antiikvalla), vasen yläkulma
//    (alareunassa ovat kertojan laatikko ja Cesiumin krediitit).
//  - Kertojan teksti: linnan kertojan laatikko mk-aikajana-kertomus (ääniä ei vielä ole, joten teksti näkyy PUHE ÄÄNENÄ -säännön mukaan).
//  - Napautus missä tahansa: pysähdyksestä seuraavaan (kuten linnan kertojan jakso).
using Matkakirja.Linssit.Lontoo;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class LontooTaulu
    {
        /// <summary>Loppuruudun kesto ennen linssin sulkua (s): mk-astroavaus--haipyy on 1,1 s.</summary>
        const float LoppuS = 1.3f;

        readonly VisualElement ruutu, nimiOtsikko, otsikko, kosketus, kertojaKehys, kertojaLaatikko;
        readonly Label ruudunNimi, ruudunAlarivi, nimi, alarivi, kertojaTeksti;
        LontooSovitin sovitin;
        bool ruutuAuki, virheKasitelty;
        int naytettyPysahdys = -1;
        float loppuAlku = -1f;

        public LontooTaulu(UiKerros kerros)
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
            otsikko.style.alignItems = Align.FlexStart;
            otsikko.style.opacity = 0f;
            nimi = Rakenne.Teksti("", "mk-aikajana-havainne__otsikko", otsikko);
            Kirjasimet.Aseta(nimi, Kirjasin.Goottilainen);
            nimi.style.fontSize = 44; nimi.style.unityTextAlign = TextAnchor.LowerLeft;
            alarivi = Rakenne.Teksti("", "mk-aikajana-havainne__kuvateksti", otsikko);
            Kirjasimet.Aseta(alarivi, Kirjasin.Antiikva);
            alarivi.style.fontSize = 19; alarivi.style.unityTextAlign = TextAnchor.UpperLeft;

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
            ruudunNimi = Rakenne.Teksti("LONTOO", "mk-astroavaus__nimi", nimiOtsikko);
            Kirjasimet.Aseta(ruudunNimi, Kirjasin.KoneLihava);
            Rakenne.El("mk-astroavaus__viiva", nimiOtsikko, PickingMode.Ignore);
            ruudunAlarivi = Rakenne.Teksti("GREENWICH – BUCKINGHAM", "mk-astroavaus__lahde", nimiOtsikko);

            LontooSovitin.Vaihtui += Kytke;
            kerros.JokaRuutu += Paivita;
        }

        void Kytke(LontooSovitin s)
        {
            sovitin = s;
            virheKasitelty = false;
            naytettyPysahdys = -1;
            loppuAlku = -1f;
            bool auki = s != null;
            kosketus.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            kertojaKehys.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            kertojaLaatikko.EnableInClassList("mk-nakyy", false);
            otsikko.style.opacity = 0f;
            if (auki) NaytaRuutu(true, heti: true);
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
