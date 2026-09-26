// LINSSIEN ESILATAUSLISTAT (Raamattu ESILATAUSPOLITIIKKA kohdat 4 ja 6; Pelikoodarin Esilataaja erä 4, suunnitelma
// docs/raportit/esilataaja-suunnitelma-20260925.md: "Linssiseppä antaa listat"). Puhdas osa: mitkä kuvat linssi näyttää
// ensimmäisinä. Jonotus ja kytkentä: Linssit/Unity/LinssienEsilataaja.
//
//   KAARI PIENENÄ: kaikkien pysäkkien kuvat levylle heti linssin auetessa. Natiivi pienentää pienen version laitteella
//   samasta tiedostosta (Kuvat.HaePienena), joten levylle vienti on "pienenä valmiina"; astronautilla on omat pikkukuvat.
//   KAKSI ENSIMMÄISTÄ TÄYSINÄ: kahden ensimmäisen pysäkin kuvat purettuina muistiin, jotta ensimmäinen näkymä ei odota.
//   Järjestys on esityksen järjestys (Ihmisen matka: kertomuksen jaksojen kohteet, sitten muut löytöpaikat).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Astronautti;

namespace Matkakirja.Linssit
{
    /// <summary>Linssin esilatauslista: koko kaari levylle, ensimmäiset täysinä muistiin (osoitteet tai Commons-nimet).</summary>
    public readonly struct EsilatausLista
    {
        public readonly IReadOnlyList<string> Kaari, Taysina;
        public EsilatausLista(IReadOnlyList<string> kaari, IReadOnlyList<string> taysina) { Kaari = kaari; Taysina = taysina; }
    }

    public static class LinssienEsilataus
    {
        /// <summary>Täysinä purettavat pysäkit (Raamattu: kaksi ensimmäistä).</summary>
        public const int TaysinaPysakkeja = 2;

        /// <summary>Ihmisen matka I ja II: jaksojen kohteiden kuvat kertomuksen järjestyksessä, sitten muut löytöpaikat.</summary>
        public static EsilatausLista IhmisenMatka(IhmisenMatkaAineisto a)
        {
            var kaari = new Kokoaja();
            if (a == null) return kaari.Lista();
            var kuvat = new Dictionary<string, string>();
            foreach (var p in a.Paikat)
                if (p?.Tunnus != null && !string.IsNullOrEmpty(p.Kuva)) kuvat[p.Tunnus] = p.Kuva;
            foreach (var j in a.Kertomus)
                if (j?.Kohde != null && kuvat.TryGetValue(j.Kohde, out var k)) kaari.Lisaa(k, taysina: true);
            foreach (var p in a.Paikat) kaari.Lisaa(p?.Kuva);
            return kaari.Lista();
        }

        /// <summary>Keksinnöt: pysäkkien pääkuvat (osoite tai Commons-nimi) pysäkkien järjestyksessä.</summary>
        public static EsilatausLista Keksinnot(KeksinnotAineisto a)
        {
            var kaari = new Kokoaja();
            if (a == null) return kaari.Lista();
            foreach (var p in a.Pysakit) kaari.Lisaa(p?.Kuva?.Osoite ?? p?.Kuva?.Tiedosto, taysina: true);
            return kaari.Lista();
        }

        /// <summary>Astronautin kamera: kohteiden oletushavaintojen pikkukuvat levylle, kahden ensimmäisen iso kuva muistiin.</summary>
        public static EsilatausLista Astronautti(AstronauttiAineisto a)
        {
            var kaari = new List<string>();
            var taysina = new List<string>();
            if (a == null) return new EsilatausLista(kaari, taysina);
            var nahty = new HashSet<string>();
            foreach (var k in a.Kohteet)
            {
                if (k == null || k.Havainnot.Count == 0) continue;
                var h = k.Havainnot[Math.Max(0, Math.Min(k.Havainnot.Count - 1, k.OletusIndeksi))];
                string pikku = !string.IsNullOrEmpty(h.Pikku) ? h.Pikku : h.Kuva;
                if (!string.IsNullOrEmpty(pikku) && nahty.Add(pikku)) kaari.Add(pikku);
                if (taysina.Count < TaysinaPysakkeja && !string.IsNullOrEmpty(h.Kuva)) taysina.Add(h.Kuva);
            }
            return new EsilatausLista(kaari, taysina);
        }

        /// <summary>Kaari ilman tyhjiä ja kaksoiskappaleita; täysinä ensimmäiset merkityt.</summary>
        sealed class Kokoaja
        {
            readonly List<string> kaari = new List<string>(), taysina = new List<string>();
            readonly HashSet<string> nahty = new HashSet<string>();

            public void Lisaa(string kuva, bool taysina = false)
            {
                if (string.IsNullOrEmpty(kuva) || !nahty.Add(kuva)) return;
                kaari.Add(kuva);
                if (taysina && this.taysina.Count < TaysinaPysakkeja) this.taysina.Add(kuva);
            }

            public EsilatausLista Lista() => new EsilatausLista(kaari, taysina);
        }
    }
}
