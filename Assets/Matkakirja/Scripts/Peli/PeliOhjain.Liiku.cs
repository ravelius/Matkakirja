// LIIKU JA VAIHDA MATKUSTUSTAPA (Pelikoodari 24.9.2026, haara pelikoodari/kulkutavat; Natiivi-UI:n pyyntö).
//
// Web js/ui.js: vaihe 'roll' (~11262) näyttää nopan ja "Vaihda matkustustapa" -napin, kun
// !game.autoTravel || game.muitaTapojaTarjolla() (Matka.VaihtoTarjolla); napin teko on
// game.actionCancelTravel (Matka.PeruKulkutapa).
//
// Liiku (~11988, renderTravelChoice ~11334): alareunan monitoiminappi avaa liu'un, jossa liftaus,
// bussi, laiva ja lento (Kulkutavat(), puhdas laskenta Peli/Liikkuminen.cs). Tapa valitaan ensin,
// kohde sen jälkeen (ValitseKulkutapa):
//   liftaus → tapa ja heitto samalla painalluksella (web doWalk), sitten nopan siirrot listana
//   bussi   → naapurit "Kaupunki (50 p)" → Matkusta (web doBus)
//   laiva   → "Laivalla (100 p)" → tapa valittu, heittonappi + Vaihda (web actionTravel('sea'))
//   lento   → lennot "Kaupunki (300 p)" ja mannerlennot → Matkusta (web doFly, actionMannerLento)
// Nopan siirroissa kartan kaupunkimerkin napautus valitsee kohteen kuten listan rivi (web: korostettu kohde).
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        /// <summary>
        /// Liiku-napin tai heittonapin tila saattoi muuttua (vaihe, silmukan tila, raha): Natiivi-UI lukee
        /// Kulkutavat(), LiikuEstetty ja VaihtoTarjolla uudelleen. Herää PaivitaNakyma-kutsusta.
        /// </summary>
        public event Action LiikuMuuttui;

        /// <summary>
        /// Linssiportti (web linssikarttaEstaa / body.aikajana-paalla): Linssiseppä asettaa tämän
        /// (LinssiOhjain.KarttaEstetty). Tosi = Liiku, matkustus, Tutki ja lehden avaus estetty, syy "linssi auki".
        /// </summary>
        public static Func<bool> LinssiEstaa;
        public const string LinssiAukiSyy = "linssi auki";
        static bool LinssiAuki { get { try { return LinssiEstaa?.Invoke() == true; } catch { return false; } } }

        /// <summary>Linssiseppä kutsuu, kun portti vaihtuu (LinssiOhjain.PorttiMuuttui): Liiku luetaan uudelleen.</summary>
        public static void LinssiPorttiMuuttui() => Instanssi?.LiikuMuuttui?.Invoke();

        /// <summary>Näkyykö heittonapin vieressä "Vaihda matkustustapa" (web: !autoTravel || muitaTapojaTarjolla).</summary>
        public bool VaihtoTarjolla => matka != null && Tila == SilmukanTila.Kartta && matka.VaihtoTarjolla();

        /// <summary>
        /// Liiku-liu'un napit (web vaihe A): liftaus, bussi, laiva, lento tekstein, hinnoin ja estosyin.
        /// Tyhjä, kun matkustustapaa ei nyt valita (vaihe Heitto: heittonappi ja Vaihda; matka, kysymys, lehti).
        /// </summary>
        public IReadOnlyList<KulkutapaNappi> Kulkutavat()
        {
            if (matka == null || !Kaytossa || (Tila != SilmukanTila.Kartta && Tila != SilmukanTila.Dialogi))
                return Array.Empty<KulkutapaNappi>();
            return Liikkuminen.Napit(matka, kaupat?.MannerLennot());
        }

        /// <summary>Liiku harmaana (web monitoimi.disabled): kaikki tavat estetty tai valintaa ei ole nyt.</summary>
        public bool LiikuEstetty => LinssiAuki || Liikkuminen.LiikuEstetty(Kulkutavat());

        /// <summary>
        /// Liiku-liu'un nappi (testikomento 'kulkutapa'): tapa ensin, kohteet sen jälkeen matkavalintaan
        /// (IMatkaValinta.Nayta). Estetty tapa palauttaa syyn. Palauttaa virheen tai null.
        /// </summary>
        public string ValitseKulkutapa(Kulkutapa laji)
        {
            if (matka == null) return "peli ei ole valmis";
            if (LinssiAuki) return LinssiAukiSyy;
            var nappi = Kulkutavat().FirstOrDefault(n => n.Laji == laji);
            if (nappi == null) return $"matkustustapaa ei valita nyt (silmukka {Tila}, vaihe {matka.Tila.Vaihe})";
            if (nappi.Estetty) return nappi.Teksti + " — " + nappi.Syy;
            PiilotaKortti();
            Tavoite = null;
            string ala = $"{matka.Tila.Pelaaja.Raha} {PeliApu.Valuutta} · päivä {matka.Tila.Paiva()} · {PeliApu.AikaNimi(matka.Tila.Vuorokaudenaika())}";
            switch (laji)
            {
                case Kulkutapa.Maa:
                {
                    dialogi.Piilota();
                    var r = matka.ValitseKulkutapa(Kulkutapa.Maa);
                    if (!r.Ok) { Virhe(r.Virhe); Kartalle(false); return r.Virhe; }
                    return HeitaJaValitse();
                }
                case Kulkutapa.Meri:
                {
                    var rivit = PeliApu.KohdeRivit(matka, Kulkutapa.Meri);
                    NaytaRivit(nappi.Teksti, ala, rivit.Select(x => x.Rivi).ToList(), _ =>
                    {
                        var r = matka.ValitseKulkutapa(Kulkutapa.Meri);
                        if (!r.Ok) { Virhe(r.Virhe); Kartalle(false); return; }
                        Tallenna();
                        Kartalle(false); // heittonappi ja Vaihda (web vaihe 'roll')
                    });
                    return null;
                }
                default:
                {
                    var rivit = PeliApu.KohdeRivit(matka, laji, kaupat?.MannerLennot());
                    NaytaRivit(nappi.Teksti, ala, rivit.Select(x => x.Rivi).ToList(),
                        i => Matkusta(rivit[i].Kohde, rivit[i].Rivi.Tapa, rivit[i].Rivi.Mannerlento));
                    return null;
                }
            }
        }

        /// <summary>Matkavalinnan rivi indeksillä (testikomento 'rivi'): Liiku-vuon kohde- ja siirtolistat.</summary>
        public string ValitseRivi(int indeksi)
        {
            if (Tila != SilmukanTila.Dialogi || riviValittu == null) return "rivilista ei ole auki";
            if (indeksi < 0 || indeksi >= vaihtoehdot.Count) return $"rivi {indeksi} ei ole listalla (0–{vaihtoehdot.Count - 1})";
            var v = riviValittu;
            riviValittu = null;
            dialogi.Piilota();
            v(indeksi);
            return null;
        }

        Action<int> riviValittu;

        void NaytaRivit(string otsikko, string ala, List<MatkaVaihtoehto> rivit, Action<int> valittu, Action peruttu = null)
        {
            vaihtoehdot = rivit;
            DialogiKohde = null;
            Tila = SilmukanTila.Dialogi;
            dialogi.PiilotaHeitto();
            riviValittu = valittu;
            dialogi.Nayta(otsikko, ala, rivit.Select(v => (v.Nimi, v.Selite)).ToList(),
                i => { if (riviValittu == null) return; riviValittu = null; valittu(i); },
                peruttu ?? (() => Kartalle(false)));
            LiikuMuuttui?.Invoke();
        }

        /// <summary>
        /// Heitto ilman tavoitetta (web doWalk/doRoll ja vaihe 'move'): noppa ensin (PeliNakymat.Noppa),
        /// sitten nopan siirrot listana. Ilman siirtoja vuoro päättyy (web 'stuck').
        /// </summary>
        string HeitaJaValitse()
        {
            if (Tila != SilmukanTila.Kartta && Tila != SilmukanTila.Dialogi) return "silmukka on tilassa " + Tila;
            if (matka.Tila.Vaihe == Vaihe.Siirto) { AvaaSiirrot(); return null; }
            var lahto = matka.Tila.Pelaaja.Sijainti;
            tapahtumat.Clear();
            var r = matka.Heita();
            if (!r.Ok) { Virhe(r.Virhe); Kartalle(false); return r.Virhe; }
            dialogi.Piilota();
            dialogi.PiilotaHeitto();
            Tallenna();
            int noppa = r.Noppa ?? 0;
            Debug.Log($"MATKAKIRJA peli: noppa {noppa}, siirtoja {matka.Tila.Siirrot?.Count ?? 0}");
            Action jatko = () =>
            {
                if (matka.Tila.Vaihe == Vaihe.Siirto) { Tila = SilmukanTila.Kartta; AvaaSiirrot(); return; }
                // Jumissa: vuoro päättyi jo (Matka.Heita); noppa häipyy.
                try { MatkaPerilla?.Invoke(null); } catch (Exception e) { Debug.LogException(e); }
                if (tapahtumat.Count > 0) Viesti(string.Join(" · ", tapahtumat));
                Kartalle(false);
            };
            var a = PeliApu.Koordinaatti(verkko, lahto);
            if (PeliNakymat.Noppa != null && Kaytossa && a.HasValue)
            {
                // Sama nopan vuo kuin Matkusta: jatko nopan valmis()-kutsusta tai varareitistä.
                Tila = SilmukanTila.Matkalla;
                matkaKohde = a.Value;
                int tunnus = ++noppaTunnus;
                noppaLiike = jatko;
                noppaLoppuu = Time.unscaledTime + NopanVaraS;
                try { PeliNakymat.Noppa(noppa, a.Value.Lat, a.Value.Lon, () => { if (tunnus == noppaTunnus) NoppaValmis(); }); }
                catch (Exception e) { Debug.LogException(e); NoppaValmis(); }
                return null;
            }
            Aanita(Aanitunnukset.Noppa);
            Viesti("Noppa " + noppa);
            jatko();
            return null;
        }

        /// <summary>
        /// Nopan siirrot matkavalintaan (otsikko "Noppa n"). Web: lista ei sulkeudu ilman valintaa, joten
        /// näkymän sulkeminen avaa sen uudelleen (Fable 24.9.2026).
        /// </summary>
        void AvaaSiirrot()
        {
            var rivit = PeliApu.SiirtoRivit(matka);
            if (rivit.Count == 0) { Kartalle(false); return; }
            string ala = $"{matka.Tila.Pelaaja.Raha} {PeliApu.Valuutta} · valitse kohde listasta tai kartalta";
            NaytaRivit($"Noppa {matka.Tila.Noppa}", ala, rivit.Select(x => x.Rivi).ToList(), i => Siirry(rivit[i].Avain),
                () => { if (matka?.Tila.Vaihe == Vaihe.Siirto) AvaaSiirrot(); else Kartalle(false); });
        }

        /// <summary>Nopan siirron avain napautetulle kaupungille ("c:id"), jos se on siirroissa; muuten null.</summary>
        string SiirtoKohde(string kaupunki)
        {
            if (matka == null || kaupunki == null || matka.Tila.Vaihe != Vaihe.Siirto || matka.Tila.Siirrot == null) return null;
            var avain = "c:" + kaupunki;
            return matka.Tila.Siirrot.ContainsKey(avain) ? avain : null;
        }

        /// <summary>Valittu nopan siirto (web actionMove): liike ja saapuminen kuten Matkusta.</summary>
        string Siirry(string avain)
        {
            if (matka.Tila.Siirrot == null || !matka.Tila.Siirrot.TryGetValue(avain, out var s)) return "ei siirtoa " + avain;
            riviValittu = null;
            var tapa = matka.Tila.Kulkutapa ?? Kulkutapa.Maa;
            return Matkusta(s.Kohde.Kaupungissa ? s.Kohde.Kaupunki : null, tapa, siirto: avain);
        }

        /// <summary>Heittonappi; vaihda-kutsu vain IHeittoVaihto-näkymälle ja vain kun vaihto on tarjolla.</summary>
        void NaytaHeittonappi(string teksti, Action painettu)
        {
            Action vaihda = matka.VaihtoTarjolla() ? () => VaihdaKulkutapa() : (Action)null;
            if (dialogi is IHeittoVaihto v) v.NaytaHeitto(teksti, painettu, vaihda);
            else dialogi.NaytaHeitto(teksti, painettu);
        }

        /// <summary>
        /// "Vaihda matkustustapa" (web actionCancelTravel; testikomento 'vaihda'): takaisin
        /// matkustustavan valintaan ennen heittoa. Heittonappi piiloutuu, ja Liiku-liuku on taas käytössä.
        /// Palauttaa virheen tai null.
        /// </summary>
        public string VaihdaKulkutapa()
        {
            if (matka == null) return "peli ei ole valmis";
            if (Tila != SilmukanTila.Kartta) return "silmukka on tilassa " + Tila;
            var r = matka.PeruKulkutapa();
            if (!r.Ok) { Virhe(r.Virhe); return r.Virhe; }
            // Uusi valinta: vanha tavoite ei enää ohjaa noppaa.
            Tavoite = null;
            Tallenna();
            PaivitaNakyma();
            Debug.Log("MATKAKIRJA peli: matkustustapa vaihtoon (actionCancelTravel)");
            return null;
        }
    }
}
