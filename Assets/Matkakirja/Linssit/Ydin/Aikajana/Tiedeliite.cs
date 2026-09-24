// TIEDELIITE (web js/tiedeliite.js): keksijän lehtisivu Keksinnöt-linssistä. Natiivi-UI piirtää
// sivun (lisälehden taittoperhe); tämä on sivun SISÄLTÖ ja säännöt webin mukaan:
//   onTiedeliitteenSivu   sivullinen pysäkki = ei merkkipaalu ja juttu on
//   tiedeliitteenNaapurit edellinen/seuraava sivullinen, merkkipaalut yli (-1 = kaaren pää)
//   tiedeliitteenKuvat    kasvorivi (kuva, kuvaToinen, kuvaAito) ja ilmiöt (ilmio, ilmioLisa)
//   jaaKappaleiksi        kirjoittajan \n\n-rajat voittavat, muuten ≥ 3 virkettä puolitetaan
//   paikkarivi            "ajoitus · paikka" (nimiörivin alarivi)
// Kuvateksti: kortissa lyhyt (lyhyt ?? selite ?? kuvateksti), suurennoksessa pitkä
// (selite ?? kuvateksti ?? lyhyt) lähderiveineen (js/kuvatekstit.js).
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Matkakirja.Linssit.Maat;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Aikajana
{
    /// <summary>Kuvatieto (web kuva/kuvaAito/ilmio): osoite TAI Commons-tiedosto, kuvatekstit ja lähde.</summary>
    public sealed class Kuvatieto
    {
        public string Osoite, Tiedosto, Lyhyt, Selite, Kuvateksti, Lahde;
        /// <summary>Varakuvan osoite, jos tämä ei lataudu (web ihmisenMatkanPysakit: löytökuvan vara = havainnekuva).</summary>
        public string Vara;
        public bool OnKuva => !string.IsNullOrEmpty(Tiedosto) || !string.IsNullOrEmpty(Osoite);
        /// <summary>Kortin kuvateksti (web kuvatekstiLyhyt).</summary>
        public string LyhytTeksti => Lyhyt ?? Selite ?? Kuvateksti ?? "";
        /// <summary>Suurennoksen kuvateksti (web kuvatekstiPitka); lähderivi Lahde erikseen.</summary>
        public string PitkaTeksti => Selite ?? Kuvateksti ?? Lyhyt ?? "";

        public static Kuvatieto Lue(object arvo)
        {
            if (arvo is string s) return new Kuvatieto { Osoite = s };
            if (!(arvo is Dictionary<string, object> o)) return null;
            return new Kuvatieto
            {
                Vara = MiniJson.Teksti(o, "vara"),
                Osoite = MiniJson.Teksti(o, "osoite"), Tiedosto = MiniJson.Teksti(o, "tiedosto"),
                Lyhyt = MiniJson.Teksti(o, "lyhyt"), Selite = MiniJson.Teksti(o, "selite"),
                Kuvateksti = MiniJson.Teksti(o, "kuvateksti"), Lahde = MiniJson.Teksti(o, "lahde"),
            };
        }
    }

    /// <summary>Yksi tiedeliitteen sivu piirtojärjestyksessä (web piirraTiedeliitteenSivu).</summary>
    public sealed class TiedeliiteSivu
    {
        public int Indeksi;
        public string Paikkarivi, Otsikko, Henkilo;
        public IReadOnlyList<string> Ingressi, Juttu, Henkilojuttu;
        /// <summary>Generoidut muotokuvat leipätekstin viereen (kuva, kuvaToinen).</summary>
        public IReadOnlyList<Kuvatieto> Kasvot;
        /// <summary>Aito Commons-kuva henkilöjutun viereen; null jos ei ole.</summary>
        public Kuvatieto Aito;
        /// <summary>Havainnekuvat: yksi = lehden kuva, useampi = karuselli.</summary>
        public IReadOnlyList<Kuvatieto> Ilmiot;
        public int Edellinen, Seuraava;
    }

    public static class Tiedeliite
    {
        public const string Nimio = "Tiedeliite";

        public static bool OnSivu(Pysakki p) => p != null && !p.Paalu && !string.IsNullOrEmpty(p.Juttu);

        public static (int Edellinen, int Seuraava) Naapurit(IReadOnlyList<Pysakki> pysakit, int i)
        {
            int Etsi(int suunta)
            {
                for (int j = i + suunta; j >= 0 && j < pysakit.Count; j += suunta)
                    if (OnSivu(pysakit[j])) return j;
                return -1;
            }
            return (Etsi(-1), Etsi(1));
        }

        /// <summary>Nimiörivin alarivi: ajoitus (tai vuosi) · paikka.</summary>
        public static string Paikkarivi(Pysakki p)
        {
            string aika = p.Ajoitus ?? (double.IsNaN(p.Vuosi) ? null : Js.Luku(p.Vuosi));
            return string.Join(" · ", new[] { aika, p.Paikka }.Where(x => !string.IsNullOrEmpty(x)));
        }

        public static TiedeliiteSivu Sivu(IReadOnlyList<Pysakki> pysakit, int i)
        {
            if (i < 0 || i >= pysakit.Count || !OnSivu(pysakit[i])) return null;
            var p = pysakit[i];
            var kasvot = new[] { p.Kuva, p.KuvaToinen, p.KuvaAito }.Where(k => k != null && k.OnKuva).ToList();
            var (e, s) = Naapurit(pysakit, i);
            return new TiedeliiteSivu
            {
                Indeksi = i, Paikkarivi = Paikkarivi(p), Otsikko = p.Otsikko, Henkilo = p.Henkilo,
                Ingressi = Kappaleet(p.Selite), Juttu = Kappaleet(p.Juttu), Henkilojuttu = Kappaleet(p.Henkilojuttu),
                Kasvot = kasvot.Where(k => !ReferenceEquals(k, p.KuvaAito)).ToList(),
                Aito = kasvot.FirstOrDefault(k => ReferenceEquals(k, p.KuvaAito)),
                Ilmiot = new[] { p.Ilmio, p.IlmioLisa }.Where(k => k != null && k.OnKuva).ToList(),
                Edellinen = e, Seuraava = s,
            };
        }

        /// <summary>Hampurilaisen sisällys: kaikki sivulliset pysäkit (indeksi, vuosi, otsikko, henkilö).</summary>
        public static IReadOnlyList<(int I, string Vuosi, string Otsikko, string Henkilo)> Sisallys(IReadOnlyList<Pysakki> pysakit) =>
            pysakit.Select((p, i) => (p, i)).Where(x => OnSivu(x.p))
                .Select(x => (x.i, x.p.Ajoitus ?? Js.Luku(x.p.Vuosi), x.p.Otsikko, x.p.Henkilo)).ToList();

        static readonly Regex Kappaleraja = new Regex(@"\n{2,}");
        static readonly Regex VirkkeenAlku = new Regex("[0-9A-ZÅÄÖÜÉ\"“«]");

        /// <summary>Web jaaKappaleiksi.</summary>
        public static IReadOnlyList<string> Kappaleet(string teksti)
        {
            string koko = (teksti ?? "").Trim();
            if (koko.Contains("\n\n"))
                return Kappaleraja.Split(koko).Select(k => k.Trim()).Where(k => k.Length > 0).ToList();
            var virkkeet = Virkkeet(koko);
            if (virkkeet.Count < 3) return koko.Length > 0 ? new[] { koko } : Array.Empty<string>();
            int puoli = (virkkeet.Count + 1) / 2;
            return new[] { string.Join(" ", virkkeet.Take(puoli)), string.Join(" ", virkkeet.Skip(puoli)) }
                .Where(k => k.Length > 0).ToList();
        }

        /// <summary>Web virkkeiksi: raja . ! ? jonka jälkeen välilyönti ja iso kirjain/numero/lainausmerkki; "2." ei katkaise.</summary>
        public static List<string> Virkkeet(string t)
        {
            t ??= "";
            var ulos = new List<string>();
            int alku = 0;
            for (int i = 0; i < t.Length; i++)
            {
                char m = t[i];
                if (m != '.' && m != '!' && m != '?') continue;
                if (m == '.' && i > 0 && char.IsDigit(t[i - 1]) && t[i - 1] <= '9') continue;
                int j = i + 1;
                while (j < t.Length && char.IsWhiteSpace(t[j])) j++;
                if (j == i + 1 || j >= t.Length) break;
                if (!VirkkeenAlku.IsMatch(t[j].ToString())) continue;
                ulos.Add(t.Substring(alku, i + 1 - alku).Trim());
                alku = i + 1;
            }
            if (alku < t.Length) ulos.Add(t.Substring(alku).Trim());
            return ulos.Where(x => x.Length > 0).ToList();
        }
    }
}
