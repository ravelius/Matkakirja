"""Koeajo (Valoseppä 15.11.): Rooman ja Wienin palatsilistaehdotus tilapäiskansioon. python3 -I koe-rooma-wien.py <rooma|wien> <ulos-kansio>"""
import sys, json, importlib.util, os
TY = '/Users/Shared/Claude/proto-3d/_tyo/valoseppa/tyyppitalot'
spec = importlib.util.spec_from_file_location('T', TY + '/tyypitys.py'); T = importlib.util.module_from_spec(spec); spec.loader.exec_module(T)
P = lambda n, j, a=True, **k: ('palatsi', 'keski', n, dict(julkisivu=j, arvio=a, odottaa='ehdotus', **k))
R = {
 'relation/2707110': P('Palazzo del Quirinale', 'lounas'), 'relation/2766788': P('Palazzo Montecitorio', 'etelä', False),
 'relation/76432': P('Palazzo Madama', 'länsi', False), 'relation/22289': P('Palazzo Farnese', 'koillinen', False),
 'relation/2716050': P('Palazzo Barberini', 'länsi'), 'relation/1709797': P('Palazzo della Cancelleria', 'pohjoinen'),
 'relation/2916876': P('Palazzo Spada', 'koillinen'), 'relation/537813': P('Palazzo Altemps', 'etelä'),
 'relation/325553': P('Palazzo Chigi', 'itä', False), 'way/140186882': P('Palazzo Venezia', 'itä', False),
 'relation/1707363': P('Palazzo Doria Pamphilj', 'itä', False), 'relation/1283512': P('Palazzo Corsini', 'itä'),
 'relation/2737120': P('Palazzo della Consulta', 'länsi'), 'relation/37216': P('Palazzo di Propaganda Fide', 'etelä'),
 'relation/2766758': P('Palazzo Koch', 'koillinen'), 'relation/325578': P('Palazzo di Giustizia', 'itä'),
 'relation/325549': P('Palazzo delle Finanze', 'pohjoinen'), 'relation/11153': P('Palazzo del Viminale', 'länsi'),
 'relation/2705998': P('Palazzo Massimo alle Terme', 'etelä'), 'way/23442671': P('Villa Medici', 'länsi'),
 'relation/1709796': P('Palazzo Braschi', 'länsi'), 'relation/1691910': P('Palazzo Senatorio', 'luode', False),
}
W = {
 'relation/5541555': P('Palais Schwarzenberg', 'pohjoinen'), 'way/158249818': P('Palais Liechtenstein (Gartenpalais)', 'länsi'),
 'relation/150055': P('Stadtpalais Liechtenstein', 'pohjoinen'), 'way/96257478': P('Palais Auersperg', 'itä'),
 'relation/57997': P('Palais Trautson', 'itä'), 'relation/2509778': P('Winterpalais', 'pohjoinen'),
 'relation/2458835': P('Palais Kinsky', 'länsi'), 'relation/1527363': P('Palais Harrach', 'länsi'),
 'relation/153359': P('Palais Ferstel', 'länsi'), 'relation/2162378': P('Palais Rasumofsky', 'länsi'),
 'way/121542619': P('Palais Coburg', 'pohjoinen'), 'relation/1541444': P('Palais Pallavicini', 'länsi'),
 'relation/3934518': P('Palais Modena', 'pohjoinen'), 'relation/1534837': P('Palais Esterházy', 'länsi'),
 'relation/6528362': P('Palais Hansen', 'koillinen'),
 'relation/20165': P('Kunsthistorisches Museum', 'koillinen'), 'relation/11187': P('Naturhistorisches Museum', 'koillinen'),
 'relation/54286': P('Parlament', 'itä', False), 'relation/1441683': P('Universität Wien', 'itä', False),
 'relation/29871': P('Börsegebäude', 'kaakko'), 'relation/65155': P('Akademie der bildenden Künste', 'koillinen'),
 'way/5887599': P('Oberes Belvedere', 'pohjoinen'), 'way/31313338': P('Unteres Belvedere', 'pohjoinen'),
}
k = sys.argv[1]; T.NIMILISTAT[k] = R if k == 'rooma' else W
T.main(['/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tyokalu-1/otteet-63/' + k, k, sys.argv[2]])
