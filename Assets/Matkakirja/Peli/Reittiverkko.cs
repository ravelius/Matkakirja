// Reittiverkko: suora portti verkkopelin js/rules.js-funktioista buildBoard,
// stepsFrom, findMoves ja reachableCities. Kultaiset testit
// (Kultaiset/siirrot.json, tehty Kultaiset/tee-kultaiset.mjs:llä) vaativat
// täsmälleen samat siirrot, polut ja saavutettavat kaupungit kuin webissä.
//
// Järjestys on osa sääntöä: findMoves säilyttää päätepisteelle ENSIMMÄISEN
// lyhimmän polun DFS-järjestyksessä, ja DFS kulkee adj-listojen järjestyksessä
// (reitit laudan edges-järjestyksessä) ja reitin varrella ensin suuntaan -1,
// sitten +1. Siksi reitit pidetään syötteen järjestyksessä.
using System;
using System.Collections.Generic;

namespace Matkakirja.Peli
{
    public sealed class Reittiverkko : IReittiverkko
    {
        readonly Dictionary<string, Kaupunki> kaupungit = new Dictionary<string, Kaupunki>();
        readonly Dictionary<string, Reitti> reitit = new Dictionary<string, Reitti>();
        readonly Dictionary<string, List<string>> naapurit = new Dictionary<string, List<string>>();
        readonly List<Reitti> lennot = new List<Reitti>();
        readonly List<Kaupunki> kaupunkiLista;
        readonly List<Reitti> reittiLista = new List<Reitti>();

        public IReadOnlyDictionary<string, Kaupunki> Kaupungit => kaupungit;
        public IReadOnlyDictionary<string, Reitti> Reitit => reitit;
        public IReadOnlyList<Reitti> Lennot => lennot;
        /// <summary>Kaupungit paketin järjestyksessä (web board.cities).</summary>
        public IReadOnlyList<Kaupunki> KaupunkiLista => kaupunkiLista;
        /// <summary>Maa/merireitit laudan järjestyksessä (web board.edges).</summary>
        public IReadOnlyList<Reitti> ReittiLista => reittiLista;

        /// <summary>
        /// Web buildBoard. Maa- ja merireitit laudan kaariksi; lentoreitit
        /// erilliseen listaan. Kaksoisreitti tai tuntematon kaupunki heittää
        /// kuten webissä.
        /// </summary>
        public Reittiverkko(IEnumerable<Kaupunki> kaupunkiSyote, IEnumerable<Reitti> reittiSyote)
        {
            kaupunkiLista = new List<Kaupunki>(kaupunkiSyote);
            foreach (var k in kaupunkiLista)
            {
                kaupungit[k.Id] = k;
                naapurit[k.Id] = new List<string>();
            }
            foreach (var r in reittiSyote)
            {
                if (r.Laji == ReitinLaji.Lento) { lennot.Add(r); continue; }
                var id = r.A + "|" + r.B;
                if (r.Id != id) throw new ArgumentException($"Reitin tunnus {r.Id} ei ole edgeId {id}");
                if (reitit.ContainsKey(id)) throw new ArgumentException($"Kaksoisreitti: {id}");
                if (!kaupungit.ContainsKey(r.A) || !kaupungit.ContainsKey(r.B))
                    throw new ArgumentException($"Tuntematon kaupunki reitillä {id}");
                if (r.Askeleet < 1) throw new ArgumentException($"Reitillä {id} ei ole askelia");
                reitit[id] = r;
                reittiLista.Add(r);
                naapurit[r.A].Add(id);
                naapurit[r.B].Add(id);
            }
        }

        public IReadOnlyList<string> Naapurireitit(string kaupunki) =>
            naapurit.TryGetValue(kaupunki, out var l) ? l : (IReadOnlyList<string>)Array.Empty<string>();

        public Reitti HaeReitti(string a, string b) =>
            reitit.TryGetValue(a + "|" + b, out var r) ? r
            : reitit.TryGetValue(b + "|" + a, out r) ? r : null;

        /// <summary>
        /// Kulkutavan vastine webin mode-merkkijonolle: Maa = 'land', Meri = 'sea'.
        /// Muilla tavoilla ('fly', 'bus', 'stay') mikään laudan kaari ei täsmää,
        /// joten kaupungista ei lähde askelia — kesken reitin matka jatkuu silti
        /// samaa reittiä kuten webissä.
        /// </summary>
        static ReitinLaji? TavanLaji(Kulkutapa tapa) =>
            tapa == Kulkutapa.Maa ? ReitinLaji.Maa
            : tapa == Kulkutapa.Meri ? ReitinLaji.Meri
            : (ReitinLaji?)null;

        /// <summary>Web stepsFrom: yhden askeleen naapurit valitulla kulkutavalla.</summary>
        public List<Sijainti> Askeleet(Sijainti p, Kulkutapa tapa)
        {
            var ulos = new List<Sijainti>();
            if (p.Kaupungissa)
            {
                var laji = TavanLaji(tapa);
                foreach (var eid in naapurit[p.Kaupunki])
                {
                    var e = reitit[eid];
                    if (laji == null || e.Laji != laji.Value) continue;
                    var toinen = e.A == p.Kaupunki ? e.B : e.A;
                    if (e.Askeleet == 1) ulos.Add(Sijainti.KaupungissaSijainti(toinen));
                    else ulos.Add(Sijainti.ReitillaSijainti(eid, e.A == p.Kaupunki ? 1 : e.Askeleet - 1));
                }
            }
            else
            {
                var e = reitit[p.Reitti];
                foreach (var suunta in new[] { -1, 1 })
                {
                    int idx = p.Askel + suunta;
                    if (idx <= 0) ulos.Add(Sijainti.KaupungissaSijainti(e.A));
                    else if (idx >= e.Askeleet) ulos.Add(Sijainti.KaupungissaSijainti(e.B));
                    else ulos.Add(Sijainti.ReitillaSijainti(e.Id, idx));
                }
            }
            return ulos;
        }

        /// <summary>
        /// Web findMoves. Kaupunkiin saa pysähtyä ennen silmäluvun loppua,
        /// reitin varrelle vain kun silmäluku loppuu. Ei peruutusta edelliseen
        /// sijaintiin. Omalle ruudulle ei jäädä. Päätepisteelle säilyy
        /// ensimmäinen lyhin polku (uusi korvaa vain, jos se on aidosti lyhyempi).
        /// Polku = sijainnit lähdön jälkeen (lähtö ei mukana), kuten webin path.
        /// </summary>
        public IReadOnlyDictionary<string, Siirto> Siirrot(Sijainti lahto, int silmaluku, Kulkutapa tapa)
        {
            var tulokset = new Dictionary<string, Siirto>();
            var lahtoAvain = lahto.Avain;
            var polku = new List<Sijainti>();

            void Kirjaa(Sijainti p)
            {
                var avain = p.Avain;
                if (avain == lahtoAvain) return;
                if (!tulokset.TryGetValue(avain, out var ed) || polku.Count < ed.Polku.Count)
                    tulokset[avain] = new Siirto { Kohde = p, Polku = new List<Sijainti>(polku) };
            }

            void Kulje(Sijainti p, int jaljella, string edellinen)
            {
                if (polku.Count > 0 && (jaljella == 0 || p.Kaupungissa)) Kirjaa(p);
                if (jaljella == 0) return;
                var tama = p.Avain;
                foreach (var askel in Askeleet(p, tapa))
                {
                    if (askel.Avain == edellinen) continue;
                    polku.Add(askel);
                    Kulje(askel, jaljella - 1, tama);
                    polku.RemoveAt(polku.Count - 1);
                }
            }

            Kulje(lahto, silmaluku, null);
            return tulokset;
        }

        public ISet<string> Saavutettavat(string lahto, int raha) =>
            Saavutettavat(Sijainti.KaupungissaSijainti(lahto), raha);

        /// <summary>
        /// Web reachableCities: BFS kaupungeista; reitti ohitetaan, jos sen
        /// maksu ylittää rahat. Reitin varrelta pääsee molempiin päihin
        /// ilman uutta maksua.
        /// </summary>
        public ISet<string> Saavutettavat(Sijainti lahto, int raha)
        {
            var nahty = new HashSet<string>();
            var jono = new Queue<string>();
            if (lahto.Kaupungissa) jono.Enqueue(lahto.Kaupunki);
            else
            {
                var e = reitit[lahto.Reitti];
                jono.Enqueue(e.A);
                jono.Enqueue(e.B);
            }
            foreach (var k in jono) nahty.Add(k);

            while (jono.Count > 0)
            {
                var kaupunki = jono.Dequeue();
                foreach (var eid in naapurit[kaupunki])
                {
                    var e = reitit[eid];
                    if (e.Maksu > raha) continue;
                    var toinen = e.A == kaupunki ? e.B : e.A;
                    if (nahty.Add(toinen)) jono.Enqueue(toinen);
                }
            }
            return nahty;
        }
    }
}
