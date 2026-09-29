// MATKAMUISTOT (Päätoimittaja 29.9.2026, elävän linnan käsikirjoitus docs/raportit/linna-elava-kasikirjoitus-20260929.md
// kohta 4): pienten etsintöjen löydöt, jotka menevät Aarteisiin omaan Matkamuistot-ryhmäänsä ja antavat tietäjäpisteitä.
// Ne EIVÄT ole Aarnin luettelon aarteita eivätkä laattalöytöjä (Pelaaja.Loydot), eivätkä muuta tarinan kaanonia.
//
// Ensimmäinen: Olavinlinnan voudin sinetti. Etsinnän vaiheet (keittiö → kappeli → fatabuuri) ja vihjeiden näkyvyys ovat
// dioraaman omaa tilaa (Linnanrakentaja ja Siirtoseppä); peli kirjaa vain löydön: PeliOhjain.LoydaMatkamuisto(id).
// Ei UnityEngineä: testattavissa Peli-testit/Testit/MatkamuistoTestit.cs.
using System.Collections.Generic;

namespace Matkakirja.Peli
{
    public sealed class Matkamuisto
    {
        public string Id, Nimi, Selite, KuvaUrl;
        /// <summary>Tietäjäpisteet löydöstä (Kokemus.Anna).</summary>
        public int Pisteet;
    }

    public static class Matkamuistot
    {
        /// <summary>Pieni etsintä = pulman arvoinen (Kokemus.Pulma, web XP_PUZZLE 25 tp).</summary>
        public const int EtsinnanPisteet = Kokemus.Pulma;
        const string Juuri = "https://media.matkakirja.app/dioraama/olavinlinna/matkamuistot/";

        /// <summary>Kaikki matkamuistot tunnuksen mukaan.</summary>
        public static readonly IReadOnlyDictionary<string, Matkamuisto> Kaikki = new Dictionary<string, Matkamuisto>
        {
            ["voudin-sinetti"] = new Matkamuisto
            {
                Id = "voudin-sinetti",
                Nimi = "Voudin sinetti",
                // Sisältökirjurin tarkistamat yleiset faktat (Kansallisarkisto: Arkistojen Portti; Wikipedia: Sinetti). Olavinlinnan
                // voudin omasta sinetistä ei ole lähdettä, joten sitä ei väitetä (Linnanrakentaja 29.9.2026).
                Selite = "Keskiajalla kirjeeseen ei kirjoitettu nimeä: aitouden takasi vahaan painettu sinetti. "
                    + "Sinettisormus oli suosittu 1100-luvulta keskiajan loppuun, ja siinä oli usein oman suvun vaakuna.",
                KuvaUrl = Juuri + "voudin-sinetti.jpg",
                Pisteet = EtsinnanPisteet,
            },
        };

        public static Matkamuisto Hae(string id) => id != null && Kaikki.TryGetValue(id, out var m) ? m : null;

        public static bool Loydetty(Pelaaja p, string id) => p != null && id != null && p.Matkamuistot.Contains(id);

        /// <summary>
        /// Kirjaa löydön ja antaa pisteet. Idempotentti: tuntematon tunnus tai jo löydetty palauttaa null (ei pisteitä).
        /// </summary>
        public static Matkamuisto Loyda(Pelaaja p, Kokemus kokemus, string id)
        {
            var m = Hae(id);
            if (m == null || p == null || Loydetty(p, id)) return null;
            p.Matkamuistot.Add(id);
            kokemus?.Anna(p, m.Pisteet);
            return m;
        }
    }
}
