// PeliOhjain.Muste — ELÄVÄ KARTTA, "isoisän muste" (omistaja 26.9.2026; docs/raportit/elava-kartta-suunnitelma-20260926.md
// kohdat 2–3; Pelikoodari). Säännöt ovat Peli/KarttaMuste.cs:ssä; tämä lukee datan, pitää löydöt tallennuksessa ja kertoo
// tapahtumat piirrolle (Natiiviseppä: NostonMuste) ja kartussille (Natiivi-UI: MaakuntaHeraa, MaakuntaValmis, NostoLoytyi).
// Data: kokoelma karttavalot — kokoluokka ("paakohde" | "kohde" | "pieni", skeema 1.45; puuttuessa taso) ja maakunta
// ("ISO:tunnus"); salaisuudet kokoelmasta maakuntasalaisuudet (id "salaisuus:<tunnus>", maakunta; skeema 1.47) tai
// karttavalorivin salaisuus: true. Jäsennys taustasäikeessä kerran.
// Testikomento: muste tila <valo> | muste loyda <valo> | muste maakunnat <ISO>.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        KarttaMuste muste;
        bool musteHaussa;

        /// <summary>Löytö kirjattiin (uusi): valo, maakunta ja laskuri.</summary>
        public event Action<MusteLoyto> NostoLoytyi;
        /// <summary>Maakunnan ensimmäinen nosto löytyi: väri valuu esiin, nimi kirjoittuu (suunnitelma kohta 3).</summary>
        public event Action<string> MaakuntaHeraa;
        /// <summary>Maakunnan kaikki nostot löytyivät: salaisuus-nosto (valo-id tai null) ilmestyy.</summary>
        public event Action<string, string> MaakuntaValmis;
        /// <summary>Data luettu: piirto voi päivittää kaikki merkit kerralla.</summary>
        public event Action MusteValmis;

        public bool MusteLuettu => muste != null;

        /// <summary>Piirrolle: noston kokoluokka ja tila (löytämätön = himmeä jälki ilman nimeä). Ennen dataa: kohde, löydetty.</summary>
        public NostonMuste NostonMuste(string valoId) =>
            muste == null ? new NostonMuste(Kokoluokka.Kohde, true, true, false) : muste.Tila(matka?.Tila.LoydetytNostot, valoId);

        /// <summary>Kartussille: maan maakunnat laskureineen (löydetyt/kaikki).</summary>
        public IEnumerable<(string Maakunta, int Loydetyt, int Kaikki)> MusteMaakunnat(string iso) =>
            muste == null || matka == null ? Enumerable.Empty<(string, int, int)>() : muste.Maakunnat(matka.Tila.LoydetytNostot, iso);

        /// <summary>
        /// Nostokortti avattiin (Natiivi-UI kutsuu, kun kortti näkyy): löytö kirjataan, tallennetaan ja tapahtumat lähtevät.
        /// Ilman matkaa (aloitusnäkymä) ei kirjata.
        /// </summary>
        public MusteLoyto NostoAvattu(string valoId)
        {
            if (matka == null || string.IsNullOrEmpty(valoId)) return null;
            var m = muste ?? new KarttaMuste();
            var t = m.Kirjaa(matka.Tila.LoydetytNostot, valoId);
            if (!t.Uusi) return t;
            Tallenna();
            Debug.Log($"MATKAKIRJA peli: muste löytö {valoId} ({t.Maakunta ?? "ei maakuntaa"} {t.Loydetyt}/{t.Kaikki})"
                      + (t.MaakuntaHeraa ? ", maakunta herää" : "") + (t.MaakuntaValmis ? $", maakunta valmis → {t.Salaisuus ?? "ei salaisuutta"}" : ""));
            try { NostoLoytyi?.Invoke(t); } catch (Exception e) { Debug.LogException(e); }
            if (t.MaakuntaHeraa) try { MaakuntaHeraa?.Invoke(t.Maakunta); } catch (Exception e) { Debug.LogException(e); }
            if (t.MaakuntaValmis) try { MaakuntaValmis?.Invoke(t.Maakunta, t.Salaisuus); } catch (Exception e) { Debug.LogException(e); }
            return t;
        }

        /// <summary>Lukee karttavalot kerran (taustasäie); kutsutaan käynnistyksessä sisällön jälkeen.</summary>
        IEnumerator HaeMuste()
        {
            if (muste != null || musteHaussa) yield break;
            musteHaussa = true;
            string teksti = null, salaisuudet = null;
            yield return Sisalto.HaeTeksti("karttavalot", t => teksti = t, true, Taso.TamaKaupunki);
            if (teksti == null) { musteHaussa = false; yield break; }
            // Maakuntien salaisuudet omana kokoelmanaan (skeema 1.47, Siirtoseppä #3285): ei karttavaloina, ettei vanha
            // build piirrä niitä tavallisina nostoina. Valinnainen.
            yield return Sisalto.HaeTeksti("maakuntasalaisuudet", t => salaisuudet = t, true, Taso.TamaKaupunki);
            var tyo = Task.Run(() => LueMuste(teksti, salaisuudet));
            while (!tyo.IsCompleted) yield return null;
            musteHaussa = false;
            if (tyo.IsFaulted) { Debug.LogWarning("MATKAKIRJA peli: muste ei jäsenny: " + tyo.Exception?.GetBaseException().Message); yield break; }
            muste = tyo.Result;
            Debug.Log($"MATKAKIRJA peli: muste {muste.Nostoja} nostoa");
            try { MusteValmis?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
        }

        static KarttaMuste LueMuste(string json, string salaisuudet)
        {
            var m = new KarttaMuste();
            var juuri = MiniJson.Jasenna(json) as Dictionary<string, object>;
            foreach (var a in MiniJson.Kentta(juuri, "alkiot") as List<object> ?? new List<object>())
            {
                if (!(a is Dictionary<string, object> o) || !(MiniJson.Teksti(o, "id") is string id)) continue;
                string maakunta = MiniJson.Teksti(o, "maakunta");
                if (MiniJson.Totuus(o, "salaisuus")) { m.LisaaSalaisuus(maakunta, id); continue; }
                var taso = MiniJson.Luku(o, "taso") is double d ? (int)d : (int?)null;
                m.LisaaNosto(id, maakunta, KarttaMuste.Luokka(MiniJson.Teksti(o, "kokoluokka"), taso));
            }
            if (salaisuudet != null)
                foreach (var a in MiniJson.Kentta(MiniJson.Jasenna(salaisuudet) as Dictionary<string, object>, "alkiot") as List<object> ?? new List<object>())
                    if (a is Dictionary<string, object> o && MiniJson.Teksti(o, "id") is string id)
                        m.LisaaSalaisuus(MiniJson.Teksti(o, "maakunta"), id);
            return m;
        }

        /// <summary>Testikomento muste (PeliKomennot).</summary>
        public string MusteKomento(string alikomento, string arvo)
        {
            switch (alikomento)
            {
                case "tila":
                {
                    var t = NostonMuste(arvo);
                    return $"={arvo}: {t.Luokka}, {(t.Loydetty ? "löydetty" : "unohdettu")}{(t.Nakyy ? "" : ", piilossa")}{(t.Salaisuus ? ", salaisuus" : "")}";
                }
                case "loyda":
                {
                    var t = NostoAvattu(arvo);
                    return t == null ? "ei matkaa" : $"={arvo}: uusi {t.Uusi}, {t.Maakunta} {t.Loydetyt}/{t.Kaikki}"
                        + (t.MaakuntaHeraa ? ", herää" : "") + (t.MaakuntaValmis ? ", valmis → " + t.Salaisuus : "");
                }
                case "maakunnat":
                    return "=" + (MusteLuettu ? string.Join(" · ", MusteMaakunnat(arvo ?? "GRC").Select(x => $"{x.Maakunta} {x.Loydetyt}/{x.Kaikki}")) : "ei luettu");
            }
            return "muste tila <valo> | muste loyda <valo> | muste maakunnat <ISO>";
        }
    }
}
