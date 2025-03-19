SET STATISTICS TIME ON;
WITH SubdivisionHierarchy AS (
    SELECT 
        id, 
        name, 
        parent_id, 
        1 AS sub_level
    FROM testdb.dbo.subdivisions
    WHERE id = (SELECT subdivision_id FROM testdb.dbo.collaborators WHERE id = 710253)

    UNION ALL

    SELECT 
        s.id, 
        s.name, 
        s.parent_id, 
        sh.sub_level + 1
    FROM testdb.dbo.subdivisions s
    INNER JOIN SubdivisionHierarchy sh ON s.parent_id = sh.id
    WHERE s.id NOT IN (100055, 100059)
)
SELECT 
    c.id, 
    c.name, 
    s.name AS sub_name, 
    s.id AS sub_id, 
    sh.sub_level, 
    (SELECT COUNT(*) FROM testdb.dbo.collaborators WHERE subdivision_id = c.subdivision_id) AS colls_count
FROM testdb.dbo.collaborators c
INNER JOIN SubdivisionHierarchy sh ON c.subdivision_id = sh.id
INNER JOIN testdb.dbo.subdivisions s ON c.subdivision_id = s.id
WHERE c.age < 40
ORDER BY sh.sub_level ASC;
SET STATISTICS TIME OFF;