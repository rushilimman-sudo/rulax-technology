const startTime = Date.now();

export const healthController = {
  check(req, res) {
    const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
    return res.json({
      status: 'healthy',
      uptime: `${uptimeSeconds}s`,
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      timestamp: new Date().toISOString(),
      service: 'Rulax Technology API',
    });
  },
};
