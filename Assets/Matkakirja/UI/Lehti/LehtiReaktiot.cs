// LIVIAN LEHTIREAKTIOT (web js/livia-lehtireaktiot.js; Pelikoodari 29.9.2026, natiivin UI-puute: PeliOhjain.LehtiSivuNakyi-
// tapahtumalla ei ollut tilaajaa, joten pulu ei reagoinut lehden sivuihin).
//
// Lehden aihesivun tultua näkyviin pulu tekee aiheen eleen (webin livianAiheEle = Pulu.AiheenEle) tunnetagilla: sama taulu
// aihe-id → (symboli, tunne, voimakkuus) kuin webissä. Geneeriset kartta-, numero- ja liitesivut ovat hiljaisia (ei riviä
// taulussa). Sama sivu ei reagoi kahdesti peräkkäin; uusi lehti aloittaa kierroksen alusta (web aloitaLivianLehtikierros).
// Vakava sivu ohittaa eleiden vähimmäisvälin: nopea siirtymä ruoasta sotahistoriaan ei jätä virnettä vakavan sivun päälle.
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class LehtiReaktiot
    {
        static readonly Dictionary<string, (string Symboli, string Tunne, float Voima)> Aiheet = new Dictionary<string, (string, string, float)>
        {
            ["kaupunki"] = ("kaupunki", "ylpea", .4f),
            ["historia"] = ("historia", "miettiva", .45f),
            ["luonto"] = ("luonto", "utelias", .45f), ["vuoret"] = ("luonto", "utelias", .45f), ["aavikko"] = ("luonto", "utelias", .45f),
            ["ruoka"] = ("ruoka", "lammin", .5f),
            ["musiikki"] = ("kulttuuri", "lammin", .45f), ["taide"] = ("kulttuuri", "lammin", .45f),
            ["kuvataide"] = ("kulttuuri", "lammin", .45f), ["nykytaide"] = ("kulttuuri", "lammin", .45f),
            ["tiede"] = ("tekniikka", "miettiva", .5f), ["keksinnot"] = ("tekniikka", "miettiva", .5f),
            ["kauppa"] = ("kauppa", "ylpea", .4f), ["menovinkit"] = ("kauppa", "ylpea", .4f),
            ["kirjallisuus"] = ("sana", "miettiva", .4f), ["kielet"] = ("sana", "miettiva", .4f),
            ["sadut"] = ("sana", "miettiva", .4f), ["kirjat"] = ("sana", "miettiva", .4f),
            ["meri"] = ("merenkulku", "utelias", .5f), ["laivat"] = ("merenkulku", "utelias", .5f),
            ["urheilu"] = ("urheilu", "ilo", .55f), ["elaimet"] = ("elain", "ilo", .55f),
            ["huuto"] = ("huuto", "hammastys", .55f), ["silma"] = ("silma", "utelias", .5f),
            ["ihme"] = ("ihme", "hammastys", .55f),
        };

        static readonly Dictionary<string, string[]> Ryhmat = new Dictionary<string, string[]>
        {
            ["historia"] = new[] { "alkuperaiskansat", "atsteekkiperinto", "kansanperinne", "muinaisuus", "mustarooma", "perinteet", "siirtolaisuus", "tasavalta", "whadjukit" },
            ["luonto"] = new[] { "kalliot", "keidas", "maasto", "puutarhat", "ranta", "saaret", "suot", "tunturi", "vedet" },
            ["ruoka"] = new[] { "herkut", "hiri", "keittio" },
            ["kulttuuri"] = new[] { "arkkitehtuuri", "elokuva", "juhlat", "kasityo", "kasityot", "kirkot", "kulttuuri", "saksalaisperinne", "savel", "soittajat", "tavat", "tekstiilit", "valo" },
            ["tekniikka"] = new[] { "oppi", "tekniikka" },
            ["kauppa"] = new[] { "kumibuumi", "talous", "tupakka" },
            ["sana"] = new[] { "huumori", "kieli", "runous", "tarinat" },
            ["kaupunki"] = new[] { "arki", "kaupunkikuva", "linnoitukset", "rakennukset", "talot", "vanhakaupunki" },
            ["elain"] = new[] { "linnut" },
            ["silma"] = new[] { "helmet" },
            ["ihme"] = new[] { "rauniot" },
        };

        static readonly Dictionary<string, (string Tunne, float Voima)> RyhmaTagit = new Dictionary<string, (string, float)>
        {
            ["historia"] = ("miettiva", .45f), ["luonto"] = ("utelias", .45f), ["ruoka"] = ("lammin", .5f),
            ["kulttuuri"] = ("lammin", .45f), ["tekniikka"] = ("miettiva", .5f), ["kauppa"] = ("ylpea", .4f),
            ["sana"] = ("miettiva", .4f), ["merenkulku"] = ("utelias", .5f), ["kaupunki"] = ("ylpea", .4f),
            ["elain"] = ("ilo", .55f), ["silma"] = ("utelias", .5f), ["ihme"] = ("hammastys", .55f),
        };

        static string viimeSivu;

        /// <summary>Aiheen symboli ja tunnetagi (web aiheTiedot); null = hiljainen sivu.</summary>
        public static (string Symboli, string Tunne, float Voima)? AiheTiedot(string id)
        {
            var v = (id ?? "").Trim().ToLowerInvariant();
            if (v.Length == 0) return null;
            if (v.StartsWith("hetki-")) return ("hetki", "jannitys", .5f);
            if (Aiheet.TryGetValue(v, out var a)) return a;
            foreach (var r in Ryhmat) if (r.Value.Contains(v)) return (r.Key, RyhmaTagit[r.Key].Tunne, RyhmaTagit[r.Key].Voima);
            return null;
        }

        /// <summary>Uusi lehti auki: sama sivu saa reagoida taas (web aloitaLivianLehtikierros).</summary>
        public static void AloitaKierros() => viimeSivu = null;

        /// <summary>Eleen ja tunteen valinta (web reagoiLivianLehtisivuun ilman ilmoitusta; testeille). Null = ei reaktiota.</summary>
        public static (string Ele, string Tunne, float Voima)? Valitse(string aiheId, string teksti)
        {
            var aihe = AiheTiedot(aiheId);
            if (aihe == null) return null;
            var (symboli, tunne, voima) = aihe.Value;
            string ele = Pulu.AiheenEle(symboli, teksti);
            if (ele == "listen") { tunne = "vakava"; voima = .5f; }
            else if (symboli == "ruoka" && ele == "manic") { tunne = "ilo"; voima = .55f; }
            else if (symboli == "elain" && ele == "grin") { tunne = "ilo"; voima = .55f; }
            return Pulu.TunteenEle(tunne) == null ? ((string, string, float)?)null : (ele, tunne, voima);
        }

        /// <summary>Aihesivu näkyvissä: pulun ele aiheen mukaan. omistaja + sivu + aihe estää saman sivun toiston.</summary>
        public static bool Reagoi(string omistaja, int sivu, LehtiAihe aihe)
        {
            if (aihe == null) return false;
            string tunniste = $"{omistaja}:{sivu}:{aihe.Id}";
            if (tunniste == viimeSivu) return false;
            var teksti = string.Join(" ", new[] { aihe.Nimi, aihe.Otsikko, aihe.Johdanto, aihe.MatkailijalleKappale }
                .Concat(aihe.Nostot.SelectMany(n => new[] { n.Otsikko, n.Teksti })).Where(t => !string.IsNullOrEmpty(t)));
            var valinta = Valitse(aihe.Id, teksti);
            if (valinta == null) return false;
            viimeSivu = tunniste;
            var (ele, tunne, voima) = valinta.Value;
            bool soi = Pulu.Hae().Tilanne("emotion", tunne: tunne, voimakkuus: voima, ele: ele, ohitaVali: tunne == "vakava");
            Debug.Log($"MATKAKIRJA lehti: reaktio {aihe.Id} → {ele} ({tunne} {voima:0.##}){(soi ? "" : " ei soinut")}");
            return soi;
        }
    }
}
