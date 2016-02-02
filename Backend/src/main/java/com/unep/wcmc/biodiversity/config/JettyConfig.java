package com.unep.wcmc.biodiversity.config;

import com.codahale.metrics.Gauge;
import com.codahale.metrics.MetricRegistry;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerCollection;
import org.eclipse.jetty.server.handler.StatisticsHandler;
import org.eclipse.jetty.util.thread.QueuedThreadPool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.embedded.jetty.JettyEmbeddedServletContainerFactory;
import org.springframework.boot.context.embedded.jetty.JettyServerCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import static com.codahale.metrics.MetricRegistry.name;

@Configuration
@ComponentScan
@EnableAutoConfiguration
public class JettyConfig {

    @Autowired
    private MetricRegistry registry;

    @Bean
    public JettyEmbeddedServletContainerFactory jettyEmbeddedServletContainerFactory(
            @Value("${server.port:8080}") final Integer port,
            @Value("${jetty.threadPool.maxThreads:200}") final Integer maxThreads,
            @Value("${jetty.threadPool.minThreads:8}") final Integer minThreads,
            @Value("${jetty.threadPool.idleTimeout:60000}") final Integer idleTimeout) {

        final JettyEmbeddedServletContainerFactory factory =  new JettyEmbeddedServletContainerFactory(port);

        factory.addServerCustomizers(new JettyServerCustomizer() {
            @Override
            public void customize(Server server) {

                HandlerCollection handlers = new HandlerCollection();
                handlers.setHandlers(new Handler[] { server.getHandler() });
                StatisticsHandler stats = new StatisticsHandler();
                stats.setHandler(handlers);
                server.setHandler(stats);

                registry.register(name("jetty", "requests", "total"), (Gauge<Integer>) stats::getRequests);
                registry.register(name("jetty", "requests", "active"), (Gauge<Integer>) stats::getRequestsActive);
                registry.register(name("jetty", "requests", "time-max"), (Gauge<Long>) stats::getRequestTimeMax);

                QueuedThreadPool threadPool = (QueuedThreadPool) server.getThreadPool();
                threadPool.setMaxThreads(maxThreads);
                threadPool.setMinThreads(minThreads);
                threadPool.setIdleTimeout(idleTimeout);

                registry.register(name("jetty", "threads", "min-size"), (Gauge<Integer>) threadPool::getMinThreads);
                registry.register(name("jetty", "threads", "max-size"), (Gauge<Integer>) threadPool::getMaxThreads);
                registry.register(name("jetty", "threads", "size"), (Gauge<Integer>) threadPool::getThreads);
                registry.register(name("jetty", "threads", "idle"), (Gauge<Integer>) threadPool::getIdleThreads);
                registry.register(name("jetty", "threads", "busy"), (Gauge<Integer>) threadPool::getBusyThreads);
                registry.register(name("jetty", "threads", "queue"), (Gauge<Integer>) threadPool::getQueueSize);
            }
        });
        return factory;
    }

}
