export default function getById(req, res){
  res.statusCode = 200
  res.setHeader('Content-type', 'application/json')
  res.end(req.query.id)
}