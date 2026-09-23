// SAAPUMISESITYS (Natiivi-UI, erä 5): webin annostelu matkakirja → Livia
// (js/fokusvirta.js, js/ui.js aloitaMerkinta) natiivin tapahtumista.
//
//   PeliOhjain.LuentoAlkoi(kaupunki)  → matkakirjakortti kirjoittuu, isoisän
//                                       luentakuva pakkaan, luentakuva2 9 s kohdalla
//   PeliOhjain.LuentoLoppui(kaupunki) → Livian kommentti(t) kuplaan äänineen,
//                                       PuluCam-kuvat pakkaan 4 s välein, kuvat
//                                       häipyvät 6 s hiljaisuuden jälkeen ja
//                                       lentävät kortin pikkukuviksi
// Intro ja lento-alku (kaupunki null) eivät avaa korttia.
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Saapumisesitys
    {
        readonly Matkakirjakortti kortti;
        readonly Pulu pulu;
        readonly HashSet<string> kommentoitu = new HashSet<string>();
        IVisualElementScheduledItem vaihto;
        string kaupunki;

        public Saapumisesitys(Matkakirjakortti kortti, Pulu pulu)
        {
            this.kortti = kortti;
            this.pulu = pulu;
            kortti.Kuvat.Lahti += kortti.LisaaPikkukuva;
        }

        public void Kytke(PeliOhjain o)
        {
            o.LuentoAlkoi += (k, _) => Alkoi(k);
            o.LuentoLoppui += Loppui;
            // Kortti avattiin kesken luennon (esim. UI syntyi myöhemmin).
            if (o.SoivaLuento != null) Alkoi(o.SoivaLuento.Kaupunki);
        }

        /// <summary>Luento alkoi (myös testikomento ilman ääntä).</summary>
        public void Alkoi(string k)
        {
            if (string.IsNullOrEmpty(k)) return;
            kaupunki = k;
            Fokusvirrat.Lataa(() =>
            {
                if (kaupunki != k) return;
                var v = Fokusvirrat.Hae(k);
                if (v == null) return;
                kortti.Nayta(v);
                kortti.Kuvat.Tyhjenna(false);
                if (v.Luentakuvat.Count > 0) kortti.Kuvat.Lisaa(v.Luentakuvat[0]);
                vaihto?.Pause();
                if (v.Luentakuvat.Count > 1)
                    vaihto = UiKerros.Hae().Juuri(UiKerros.Tilarivi).schedule
                        .Execute(() => { if (kaupunki == k) kortti.Kuvat.Lisaa(v.Luentakuvat[1]); })
                        .StartingIn(Luentakuvasarja.VaihtoMs);
            });
        }

        /// <summary>Luento loppui: Livian vuoro (kerran per kaupunkikäynti), sitten kuvat pois.</summary>
        public void Loppui(string k)
        {
            vaihto?.Pause();
            if (string.IsNullOrEmpty(k) || k != kaupunki) return;
            var v = Fokusvirrat.Hae(k);
            if (v == null || kommentoitu.Contains(k) || v.PuluKommentit.Count == 0)
            {
                kortti.Kuvat.Hiljeni();
                return;
            }
            kommentoitu.Add(k);
            vuoro = -1;
            Kommentti(v, 0);
        }

        int vuoro = -1;

        void Kommentti(Saapumisvirta v, int i)
        {
            // Kuittaus ja lukuajan ajastin voivat molemmat pyytää seuraavaa: vain kerran.
            if (i <= vuoro) return;
            vuoro = i;
            if (i >= v.PuluKommentit.Count) { kortti.Kuvat.Hiljeni(); return; }
            var juuri = UiKerros.Hae().Juuri(UiKerros.Tilarivi);
            // PuluCam-kuvat liittyvät pakkaan hänen puheenvuoronsa alussa (4 s välein).
            if (i == 0) for (int n = 0; n < v.PuluKuvat.Count; n++)
            {
                var kuva = v.PuluKuvat[n];
                juuri.schedule.Execute(() => kortti.Kuvat.Lisaa(kuva)).StartingIn(600 + n * Luentakuvasarja.PuluVaihtoMs);
            }
            var teksti = v.PuluKommentit[i];
            pulu.Sano(teksti, Pulu.AaniOsoite(v.Kaupunki, i), null, () => Kommentti(v, i + 1));
            // Ilman kuittausta seuraava kommentti lukuajan jälkeen.
            juuri.schedule.Execute(() => { if (i + 1 < v.PuluKommentit.Count) Kommentti(v, i + 1); else kortti.Kuvat.Hiljeni(); })
                .StartingIn((long)PuluKuplat.Lukuaika(teksti) + 280);
        }
    }
}
